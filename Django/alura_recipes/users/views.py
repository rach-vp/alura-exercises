from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

def login(request):
  if request.method == 'POST':
    email = request.POST['email']
    password = request.POST['password']
    if User.objects.filter(email=email).exists():
      username = User.objects.filter(email=email).values_list('username', flat=True).get()
      if authenticate(request, username=username, password=password) is not None:
        print('Successful login')
        return redirect('dashboard')
    print('Invalid credentials')
    return redirect('login')
  return render(request, 'users/login.html')

def logout(request):
  pass

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
  return render(request, 'users/dashboard.html')
