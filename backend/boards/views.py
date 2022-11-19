from rest_framework import generics, permissions
from rest_framework.views import View
from .models import Board, ListItem
from .serializers import BoardSerializer, ListItemSerializer

class BoardCreate(generics.CreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)

class BoardShow(generics.RetrieveUpdateDestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)


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

