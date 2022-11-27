from rest_framework import generics, permissions
from .models import Board, ListItem, CardItem
from .serializers import BoardSerializer, ListItemSerializer, CardItemSerializer

class BoardCreate(generics.CreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)

class BoardShow(generics.RetrieveAPIView):
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
