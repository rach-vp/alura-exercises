from django.shortcuts import render
from passagens.forms import PassagensForm, PessoaForm

def index(request):
  passagens_form = PassagensForm()
  pessoa_form = PessoaForm()
  context = { 'form': passagens_form, 'pessoa': pessoa_form }
  return render(request, 'index.html', context)

def consulta(request):
  consulta_info = PassagensForm(request.POST)
  pessoa_info = PessoaForm(request.POST)
  if consulta_info.is_valid():
    context = { 'info': consulta_info, 'pessoa': pessoa_info }
    return render(request, 'consulta.html', context)
  else:
    context = { 'form': consulta_info, 'pessoa': pessoa_form }
    return render(request, 'index.html', context)
