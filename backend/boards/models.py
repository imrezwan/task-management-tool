from django.db import models
from django.contrib.auth.models import User

class Board(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    is_public = models.BooleanField(default=False)
    is_favourite = models.BooleanField(default=False)
    bg = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ListItem(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="listitems")
    name = models.CharField(max_length=255)
    order = models.DecimalField(decimal_places=8, max_digits=16, default= 0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.name


class CardItem(models.Model):
    listitem = models.ForeignKey(ListItem, on_delete=models.CASCADE, related_name="carditems")
    name = models.CharField(max_length=255)
    desc = models.TextField(default="", blank=True)
    order = models.DecimalField(decimal_places=8, max_digits=16, default= 0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.name

class CardComment(models.Model):
    carditem = models.ForeignKey(CardItem, on_delete=models.CASCADE, related_name="cardcomments")
    comment = models.TextField(default="", blank=False)
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return self.comment