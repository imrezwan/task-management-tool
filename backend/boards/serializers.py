from rest_framework import serializers
from .models import Board, ListItem, CardItem

class CardItemSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'listitem', 'name', 'desc', 'order', 'created_at')
        model = CardItem

    def create(self, validated_data):
        listId = validated_data['listitem']
        cardObj = CardItem.objects.create(**validated_data)
        top = CardItem.objects.filter(listitem=listId).order_by('-order')
        if len(top) > 0:
            topOrder = getattr(top[0], 'order')
            cardObj.order = (topOrder if topOrder is not None else 0) + 4096
        cardObj.save()
        return cardObj

class ListItemSerializer(serializers.ModelSerializer):
    carditems = CardItemSerializer(many=True)
    class Meta:
        fields = ('id', 'board', 'name', 'order', 'created_at', 'carditems')
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


class BoardSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    listitems = ListItemSerializer(many=True)
    class Meta:
        fields = ('id', 'owner', 'name', 'created_at', 'listitems')
        model = Board
