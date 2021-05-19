from django.shortcuts import render

def index(req):
  return render(req, 'index.html')

def recipe(req):
  return render(req, 'receita.html')
