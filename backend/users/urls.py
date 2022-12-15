from django.urls import path
from users.views import UserProfileDetail

urlpatterns = [
    path('<int:pk>/', UserProfileDetail.as_view())
]
