from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    id = serializers.ReadOnlyField(source='user.id')
    class Meta:
        fields = ('bio', 'display_name', 'profile_image', 'username', 'email', 'id')
        model = UserProfile
