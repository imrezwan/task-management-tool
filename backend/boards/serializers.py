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
        boardId = validated_data['board']
        listObj = ListItem.objects.create(**validated_data)
        top = ListItem.objects.filter(board=boardId).order_by('-order')
        if len(top) > 0:
            topOrder = getattr(top[0], 'order')
            listObj.order = (topOrder if topOrder is not None else 0) + 4096
        listObj.save()
        return listObj

    def update(self, instance, validated_data):
        print("UPDATE ==> ", instance, validated_data)    
        return super(ListItemSerializer, self).update(instance, validated_data)