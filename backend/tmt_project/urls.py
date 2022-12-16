from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view

schema_view = get_schema_view(title="Task Management Tool")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('boards.urls')),
    path('api/v1/profile/', include('users.urls')),
    path('api/v1/rest-auth/', include('dj_rest_auth.urls')),
    path('api/v1/signup/', include('dj_rest_auth.registration.urls')),
    path('docs/', include_docs_urls(title="Task Mangement Tool")),
    path('schema/', schema_view),
]
