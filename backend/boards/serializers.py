from rest_framework import serializers
from .models import Board

class BoardSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        fields = ('id', 'owner', 'name', 'created_at')
        model = Board