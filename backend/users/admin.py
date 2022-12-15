from django.contrib import admin
from .models import UserProfile

class ShowIdAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class UserProfileAdmin(ShowIdAdmin):
    pass

admin.site.register(UserProfile, UserProfileAdmin)
