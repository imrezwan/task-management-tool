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
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs): 
      top = ListItem.objects.filter(board=self.board_id).order_by('-order')
      topOrder = getattr(top[0], 'order')
      self.order = (topOrder if topOrder is not None else 0) + 1
      super(ListItem, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name