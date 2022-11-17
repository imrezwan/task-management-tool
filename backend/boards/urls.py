from django.urls import path, include
from .views import BoardCreate, BoardShow

urlpatterns = [
    path('createboard/', BoardCreate.as_view()),
    path('board/<int:pk>/', BoardShow.as_view())
]
