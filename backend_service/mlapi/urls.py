

from django.urls import path
from .views import PredictView, LogListView, UserProfileView, TransactionHistoryView

urlpatterns = [
    path('predict/', PredictView.as_view(), name='predict'),
    path('logs/', LogListView.as_view(), name='logs'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('transactions/', TransactionHistoryView.as_view(), name='transactions'),
]
