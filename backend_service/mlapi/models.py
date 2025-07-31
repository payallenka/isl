from django.db import models

class User(models.Model):
    firebase_uid = models.CharField(max_length=128, unique=True)
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email or self.firebase_uid

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    timestamp = models.DateTimeField(auto_now_add=True)
    request_data = models.TextField()
    response_data = models.TextField()
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.email} - {self.timestamp} - {self.status}"

class MLLog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    request_data = models.TextField()
    response_data = models.TextField()
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.timestamp} - {self.status}"

from django.db import models

class User(models.Model):
    firebase_uid = models.CharField(max_length=128, unique=True)
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email or self.firebase_uid

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    timestamp = models.DateTimeField(auto_now_add=True)
    request_data = models.TextField()
    response_data = models.TextField()
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.email} - {self.timestamp} - {self.status}"
