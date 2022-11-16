from django.urls import path, include
from .views import BoardCreate

urlpatterns = [
    path('createboard/', BoardCreate.as_view())
]
