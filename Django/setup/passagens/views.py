from django.shortcuts import render
from passagens.forms import PassagensForm

def index(request):
  passagens_form = PassagensForm()
  context = { 'passagens_form': passagens_form }
  return render(request, 'index.html', context)

def consulta(request):
  consulta_info = PassagensForm(request.POST)
  context = { 'info': consulta_info }
  return render(request, 'consulta.html', context)
