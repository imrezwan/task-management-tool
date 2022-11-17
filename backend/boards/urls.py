from django.urls import path, include
from .views import BoardCreate, BoardShow, ListItemCreate, ListItemShow, ListItemAll

urlpatterns = [
    path('createboard/', BoardCreate.as_view()),
    path('board/<int:pk>/', BoardShow.as_view()),
    path('createlist/', ListItemCreate.as_view()),
    path('board/<int:board_id>/lists/', ListItemAll.as_view()),
    path('lists/<int:pk>/', ListItemShow.as_view()),
]
