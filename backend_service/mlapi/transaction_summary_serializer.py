from rest_framework import serializers
from .models import Transaction
import json

class TransactionSummarySerializer(serializers.ModelSerializer):
    gesture = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = ['id', 'timestamp', 'status', 'gesture']

    def get_gesture(self, obj):
        try:
            data = json.loads(obj.response_data)
            return data.get('gesture', None)
        except Exception:
            return None
