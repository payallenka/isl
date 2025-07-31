
from django.contrib import admin
from .models import User, Transaction, MLLog

@admin.register(MLLog)
class MLLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'status')
    search_fields = ('status', 'request_data', 'response_data')
    readonly_fields = ('timestamp',)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('firebase_uid', 'email', 'display_name', 'created_at', 'last_login')
    search_fields = ('email', 'firebase_uid', 'display_name')
    readonly_fields = ('created_at', 'last_login')

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'timestamp', 'status')
    search_fields = ('user__email', 'status', 'request_data', 'response_data')
    readonly_fields = ('timestamp',)
