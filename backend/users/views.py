import json
from rest_framework import generics, permissions
from users.models import UserProfile, User
from users.permissions import IsProfileOwner
from users.serializers import UserProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class UserProfileDetail(APIView):
    permission_classes = (permissions.IsAuthenticated, IsProfileOwner)
    serializer_class = UserProfileSerializer
    
    def get_queryset(self):
        queryset = UserProfile.objects.filter(user = self.request.user.id)
        return queryset
    
    def get(self, request, format=None):
        obj = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(obj)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.user.id)
        userprofile = UserProfile.objects.get(user=user)
        
        if userprofile:
            if request.data.get('display_name'):
                userprofile.display_name = request.data.get('display_name')
            if request.data.get('profile_image'):
                userprofile.profile_image = request.data.get('profile_image')
            if request.data.get('bio'):
                userprofile.bio = request.data.get('bio')
            userprofile.save()
            serializer = UserProfileSerializer(userprofile)
            return Response(serializer.data, status=200)
        return Response(status=404)


