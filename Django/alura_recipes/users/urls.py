from django.urls import path
from . import views

urlpatterns = [
  path('login', views.login, name='login'),
  path('logout', views.logout, name='logout'),
  path('register', views.register, name='register'),
  path('dashboard', views.dashboard, name='dashboard'),
  path('create_recipe', views.create_recipe, name='create_recipe'),
  path('delete_recipe/<int:recipe_id>', views.delete_recipe, name='delete_recipe'),
  path('edit_recipe/<int:recipe_id>', views.edit_recipe, name='edit_recipe'),
]
