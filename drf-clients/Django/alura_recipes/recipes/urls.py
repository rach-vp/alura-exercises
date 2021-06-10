from django.urls import path

from . import views

urlpatterns = [
  path('', views.index, name='index'),
  path('<int:recipe_id>', views.recipe, name='recipe'),
  path('search', views.search, name='search'),
  path('create_recipe', views.create_recipe, name='create_recipe'),
  path('delete_recipe/<int:recipe_id>', views.delete_recipe, name='delete_recipe'),
  path('edit_recipe/<int:recipe_id>', views.edit_recipe, name='edit_recipe'),
]
