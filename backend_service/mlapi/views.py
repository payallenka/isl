


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import MLLog, User, Transaction
from .serializers import MLLogSerializer, UserSerializer, TransactionSerializer
from .transaction_summary_serializer import TransactionSummarySerializer
import json
import httpx
from django.utils import timezone
from asgiref.sync import sync_to_async
import firebase_admin
from firebase_admin import auth, credentials
from opentelemetry import trace
from opentelemetry.instrumentation.django import DjangoInstrumentor

# Initialize OpenTelemetry
DjangoInstrumentor().instrument()
tracer = trace.get_tracer(__name__)

# Initialize Firebase Admin SDK (ensure GOOGLE_APPLICATION_CREDENTIALS is set)
if not firebase_admin._apps:
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred)

def get_firebase_user(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    id_token = auth_header.split(' ')[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        firebase_uid = decoded_token['uid']
        email = decoded_token.get('email', '')
        display_name = decoded_token.get('name', '')
        user, _ = User.objects.get_or_create(firebase_uid=firebase_uid, defaults={
            'email': email,
            'display_name': display_name
        })
        user.last_login = timezone.now()
        user.save()
        return user
    except Exception as e:
        return None

class PredictView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        with tracer.start_as_current_span("predict-transaction"):
            user = get_firebase_user(request)
            req_json = request.data
            try:
                with httpx.Client() as client:
                    ml_response = client.post(
                        "http://localhost:8001/predict",
                        json=req_json,
                        headers={"Content-Type": "application/json"}
                    )
                response_data = ml_response.text
                log_status = "success" if ml_response.status_code == 200 else "error"
            except Exception as e:
                response_data = str(e)
                log_status = "error"
            if user is None:
                # Use or create a dummy user for unauthenticated requests
                user, _ = User.objects.get_or_create(
                    firebase_uid='dummy',
                    defaults={
                        'email': 'dummy@example.com',
                        'display_name': 'Dummy User'
                    }
                )
            Transaction.objects.create(
                user=user,
                request_data=json.dumps(req_json),
                response_data=response_data,
                status=log_status
            )
            if log_status == "success":
                return Response(json.loads(response_data), status=status.HTTP_200_OK)
            else:
                return Response({"error": response_data}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LogListView(APIView):
    def get(self, request):
        logs = MLLog.objects.all().order_by('-timestamp')
        serializer = MLLogSerializer(logs, many=True)
        return Response(serializer.data)

class UserProfileView(APIView):
    def get(self, request):
        user = get_firebase_user(request)
        if not user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class TransactionHistoryView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        user = get_firebase_user(request)
        if user:
            transactions = Transaction.objects.filter(user=user).order_by('-timestamp')
        else:
            transactions = Transaction.objects.all().order_by('-timestamp')
        serializer = TransactionSummarySerializer(transactions, many=True)
        return Response(serializer.data)

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request):
        id_token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = get_user_from_token(id_token)
        if not user:
            return Response({'error': 'Invalid or missing Firebase token.'}, status=401)
        serializer = UserSerializer(user)
        return Response(serializer.data)

