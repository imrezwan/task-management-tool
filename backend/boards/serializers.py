from rest_framework import serializers
from .models import Board, ListItem

class BoardSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        fields = ('id', 'owner', 'name', 'created_at')
        model = Board


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'board', 'name', 'order', 'created_at')
        model = ListItem

    def create(self, validated_data):
        return ListItem.objects.create(**validated_data)