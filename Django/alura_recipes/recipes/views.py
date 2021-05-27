from django.shortcuts import render, get_list_or_404, get_object_or_404
from .models import Recipe

def index(req):
  recipes = Recipe.objects.order_by('-created_at').filter(published=True)
  data = { 'recipes': recipes }
  return render(req, 'index.html', data)

def recipe(req, recipe_id):
  recipe = get_object_or_404(Recipe, pk = recipe_id)

  recipe_data = { 'recipe': recipe }

  return render(req, 'receita.html', recipe_data)

def search(req):
  recipes = Recipe.objects.order_by('-created_at').filter(published=True)

  if 'recipe' in req.GET:
    name = req.GET['recipe']
    if name:
      recipes = recipes.filter(recipe_name__icontains=name)

  recipe_data = { 'recipes': recipes }

  return render(req, 'search.html', recipe_data)
