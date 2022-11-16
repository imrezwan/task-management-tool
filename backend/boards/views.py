from rest_framework import generics, permissions

from .models import Board
from .serializers import BoardSerializer

class BoardCreate(generics.CreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        print("-----------------------------")
        print(self.request.user)
        serializer.save(owner_id=self.request.user)