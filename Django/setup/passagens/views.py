from django.shortcuts import render
from passagens.forms import PassagensForm

def index(request):
  passagens_form = PassagensForm()
  context = { 'form': passagens_form }
  return render(request, 'index.html', context)

def consulta(request):
  consulta_info = PassagensForm(request.POST)
  if consulta_info.is_valid():
    context = { 'info': consulta_info }
    return render(request, 'consulta.html', context)
  else:
    context = { 'form': consulta_info }
    return render(request, 'index.html', context)
