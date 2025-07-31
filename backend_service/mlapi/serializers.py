

from rest_framework import serializers
from .models import User, Transaction, MLLog

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firebase_uid', 'email', 'display_name', 'created_at', 'last_login']

class TransactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'timestamp', 'request_data', 'response_data', 'status']

class MLLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLLog
        fields = '__all__'
