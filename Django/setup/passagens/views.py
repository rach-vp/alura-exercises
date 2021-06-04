from django.shortcuts import render
from passagens.forms import PassagensForm

def index(request):
  passagens_form = PassagensForm()
  context = { 'passagens_form': passagens_form }
  return render(request, 'index.html', context)
