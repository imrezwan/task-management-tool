from django.urls import path
from users.views import UserProfileDetail
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', UserProfileDetail.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
