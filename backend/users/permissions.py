from rest_framework import permissions

class IsProfileOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user.id == request.user.id
