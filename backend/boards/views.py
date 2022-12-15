from rest_framework import generics, permissions
from .models import Board, CardComment, CardItem, ListItem
from .permissions import IsOwner
from .serializers import (BoardSerializer, BoardSummarySerializer, CardCommentSerializer, CardItemSerializer, ListItemSerializer, UserSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BoardCreate(generics.CreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
class BoardShow(generics.RetrieveUpdateDestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

class BoardAllShow(generics.ListAPIView):
    serializer_class = BoardSummarySerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        queryset = Board.objects.filter(owner = self.request.user.id).order_by('-created_at')
        return queryset

class ListItemCreate(generics.CreateAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

class ListItemShow(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

class ListItemAll(generics.ListAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = ListItem.objects.all()
        board = self.kwargs['board_id']
        if board is not None:
            queryset = queryset.filter(board=board).order_by('order')
        return queryset

class ListItemOrderUpdate(generics.UpdateAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer
    permission_classes = (permissions.IsAuthenticated,)


# card views
class CardItemCreate(generics.CreateAPIView):
    queryset = CardItem.objects.all()
    serializer_class = CardItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

class CardItemShow(generics.RetrieveUpdateDestroyAPIView):
    queryset = CardItem.objects.all()
    serializer_class = CardItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

class CardItemAll(generics.ListAPIView):
    queryset = CardItem.objects.all()
    serializer_class = CardItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = CardItem.objects.all()
        listid = self.kwargs['list_id']
        if listid is not None:
            queryset = queryset.filter(listitem=listid).order_by('order')
        return queryset

class CardItemOrderUpdate(generics.UpdateAPIView):
    queryset = CardItem.objects.all()
    serializer_class = CardItemSerializer
    permission_classes = (permissions.IsAuthenticated,)


class AllCardItemOrderUpdate(generics.ListAPIView):
    queryset = CardItem.objects.all()
    serializer_class = CardItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        listid = self.kwargs['list_id']
        queryset = CardItem.objects.filter(listitem=listid).order_by(
            'order')
        if listid is not None:
            all_cards = queryset
            for i, card in enumerate(all_cards):
                card.order = card.order + (i+1)*100
                card.save()

        return queryset


class UserShow(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        return Response({'username': request.user.username, 'email': request.user.email, 'id': request.user.id })

class CardCommentCreate(generics.CreateAPIView):
    queryset = CardComment.objects.all()
    serializer_class = CardCommentSerializer
    permission_classes = (permissions.IsAuthenticated,)

class CardCommentAll(generics.ListAPIView):
    queryset = CardComment.objects.all()
    serializer_class = CardCommentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        cardid = self.kwargs['card_id']
        queryset = CardComment.objects.filter(carditem=cardid).all()
        return queryset