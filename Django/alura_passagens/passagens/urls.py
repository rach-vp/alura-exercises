from django.urls import path
from . import views

urlpatterns = [
  path('', views.index, name="index"),
  path('consulta', views.consulta, name="consulta"),
]