from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from clients import views as clients_views

router = routers.DefaultRouter()
router.register('clients', clients_views.ClientViewSet, basename='Clients')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
