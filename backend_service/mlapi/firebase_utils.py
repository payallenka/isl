import firebase_admin
from firebase_admin import auth, credentials
from .models import User
from django.utils import timezone

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
