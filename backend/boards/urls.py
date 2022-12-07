from django.urls import path, include
from .views import AllCardItemOrderUpdate, BoardCreate, BoardShow, ListItemCreate, ListItemShow, ListItemAll, ListItemOrderUpdate, CardItemCreate, CardItemShow, CardItemAll, CardItemOrderUpdate, UserShow

urlpatterns = [
    path('currentuser/', UserShow.as_view()),

    path('createboard/', BoardCreate.as_view()),
    path('board/<int:pk>/', BoardShow.as_view()),

    path('createlist/', ListItemCreate.as_view()),
    path('board/<int:board_id>/lists/', ListItemAll.as_view()),
    path('lists/<int:pk>/', ListItemShow.as_view()),
    path('updatelistorder/<int:pk>/', ListItemOrderUpdate.as_view()),

    path('createcard/', CardItemCreate.as_view()),
    path('list/<int:list_id>/cards/', CardItemAll.as_view()),
    path('cards/<int:pk>/', CardItemShow.as_view()),
    path('updatecardorder/<int:pk>/', CardItemOrderUpdate.as_view()),

    path('inccardorder/<int:list_id>/', AllCardItemOrderUpdate.as_view()),
]
