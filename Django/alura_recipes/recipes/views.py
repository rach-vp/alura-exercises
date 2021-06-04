from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth.models import User
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

def create_recipe(request):
  if request.method == 'POST':
    recipe_data = {
      'Nome da receita': request.POST['nome_receita'].strip(),
      'Ingredientes': request.POST['ingredientes'].strip(),
      'Modo de preparo': request.POST['modo_preparo'].strip(),
      'Tempo de preparo': request.POST['tempo_preparo'].strip(),
      'Rendimento': request.POST['rendimento'].strip(),
      'Categoria': request.POST['categoria'].strip(),
      'Imagem': request.FILES['foto_receita'],
      'author': get_object_or_404(User, pk=request.user.id)
    }
    recipe = Recipe.objects.create(
      author=recipe_data['author'],
      recipe_name=recipe_data['Nome da receita'],
      picture=recipe_data['Imagem'],
      ingredients=recipe_data['Ingredientes'],
      instructions=recipe_data['Modo de preparo'],
      time_prepare=recipe_data['Tempo de preparo'],
      portions=recipe_data['Rendimento'],
      category=recipe_data['Categoria'],
    )
    recipe.save()
    return redirect('dashboard')
  return render(request, 'users/create_recipe.html')

def delete_recipe(request, recipe_id):
  recipe = get_object_or_404(Recipe, pk=recipe_id)
  recipe.delete()
  return redirect('dashboard')

def edit_recipe(request, recipe_id):
  recipe = get_object_or_404(Recipe, pk=recipe_id)
  if request.method == 'POST':
    recipe_data = {
      'Título da receita': {
        'column': 'recipe_name',
        'data': request.POST['nome_receita'],
      },
      'Ingredientes': {
        'column': 'ingredients',
        'data': request.POST['ingredientes'],
      },
      'Modo de preparo': {
        'column': 'instructions',
        'data': request.POST['modo_preparo'],
      },
      'Tempo de preparo': {
        'column': 'time_prepare',
        'data': request.POST['tempo_preparo'],
      },
      'Rendimento': {
        'column': 'portions',
        'data': request.POST['rendimento'],
      },
      'Categoria da receita': {
        'column': 'category',
        'data': request.POST['categoria'],
      },
      'Foto da receita': {
        'column': 'picture',
        'data': get_recipe_picture(request, recipe),
      },
    }
    for field in recipe_data:
      if not recipe_data[field]['data']:
        messages.error(request, f'Campo {field} não está preenchido')
        return redirect('edit_recipe')
      else:
        setattr(recipe, recipe_data[field]['column'], recipe_data[field]['data'])
    recipe.save()
    return redirect('dashboard')


  recipe_data = { 'recipe': recipe }
  return render(request, 'users/edit_recipe.html', recipe_data)

def get_recipe_picture(request, recipe):
  return recipe.picture.url.split('/media/')[-1] if not request.FILES else request.FILES['foto_receita']
