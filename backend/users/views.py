from rest_framework import generics, permissions
from users.models import UserProfile
from users.permissions import IsProfileOwner
from users.serializers import UserProfileSerializer

class UserProfileDetail(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsProfileOwner)
    serializer_class = UserProfileSerializer
    
    def get_queryset(self):
        queryset = UserProfile.objects.filter(user = self.request.user.id)
        return queryset


