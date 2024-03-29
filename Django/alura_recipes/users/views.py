from django.shortcuts import render, redirect
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
