from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib import auth, messages
from recipes.models import Recipe

def login(request):
  if request.method == 'POST':
    email = request.POST['email']
    password = request.POST['password']
    if User.objects.filter(email=email).exists():
      username = User.objects.filter(email=email).values_list('username', flat=True).get()
      login = auth.authenticate(request, username=username, password=password)
      if login is not None:
        auth.login(request, login)
        messages.success(request, 'Successful login')
        return redirect('dashboard')
    messages.error(request, 'Invalid credentials')
    return redirect('login')
  return render(request, 'users/login.html')

def logout(request):
  auth.logout(request)
  return redirect('index')

def register(request):
  if request.method == 'POST':
    form_data = {
      'Nome completo': request.POST['nome'].strip(),
      'Email': request.POST['email'].strip(),
      'Senha': request.POST['password'].strip(),
      'Confirmação de senha': request.POST['password2'].strip(),
    }

    for data in form_data:
      if not form_data[data]:
        messages.error(request, f'Field "{data}" must be filled')
        return redirect('register')
    if User.objects.filter(email=form_data['Email']).exists():
      messages.error(request, 'User already exists')
      return redirect('register')
    if not form_data['Senha'] == form_data['Confirmação de senha']:
      messages.error(request, 'Passwords must match')
      return redirect('register')

    user = User.objects.create_user(
      username=form_data['Nome completo'],
      email=form_data['Email'],
      password=form_data['Senha'],
    )
    user.save()
    messages.success(request, 'User successfully registered')
    return redirect('login')
  return render(request, 'users/register.html')

def dashboard(request):
  if request.user.is_authenticated:
    recipes_data = Recipe.objects.order_by('-created_at').filter(author=request.user.id)
    recipes = {
      'recipes': recipes_data,
    }
    return render(request, 'users/dashboard.html', recipes)
  return redirect('login')

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
