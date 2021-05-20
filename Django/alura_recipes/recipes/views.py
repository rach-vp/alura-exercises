from django.shortcuts import render

def index(req):
  recipes = {
    1: 'Lasagna',
    2: 'Tomato Soupe',
    3: 'Ice Cream',
    4: 'Brigadeiro',
  }
  data = { 'recipes': recipes }
  return render(req, 'index.html', data)

def recipe(req):
  return render(req, 'receita.html')
