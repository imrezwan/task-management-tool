from rest_framework import permissions
from .models import BoardPermission


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        permissions = BoardPermission.objects.filter(board=obj)

        for permission in permissions:
            if permission.member_id == request.user.id:
                return True
        return obj.owner.id == request.user.id