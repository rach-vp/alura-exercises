from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib import auth
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
        print('Successful login')
        return redirect('dashboard')
    print('Invalid credentials')
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
        print(f'Field "{data}" must be filled')
        return redirect('register')
    if User.objects.filter(email=form_data['Email']).exists():
      print('User already exists')
      return redirect('register')
    if not form_data['Senha'] == form_data['Confirmação de senha']:
      print('Passwords must match')
      return redirect('register')

    user = User.objects.create_user(
      username=form_data['Nome completo'],
      email=form_data['Email'],
      password=form_data['Senha'],
    )
    user.save()
    print('User successfully registered')
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
