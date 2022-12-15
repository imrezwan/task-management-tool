from django.contrib import admin
from .models import Board, BoardPermission, CardComment, ListItem, CardItem

class ShowIdAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class BoardAdmin(ShowIdAdmin):
    pass
class ListItemAdmin(ShowIdAdmin):
    pass
class CardItemAdmin(ShowIdAdmin):
    pass

class CardCommentAdmin(ShowIdAdmin):
    pass

class BoardPermissionAdmin(ShowIdAdmin):
    pass

admin.site.register(Board, BoardAdmin)
admin.site.register(ListItem, ListItemAdmin)
admin.site.register(CardItem, CardItemAdmin)
admin.site.register(CardComment, CardCommentAdmin)
admin.site.register(BoardPermission, BoardPermissionAdmin)
