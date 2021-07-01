from django.shortcuts import render
from animals.models import Animal

def index(request):
  context = { 'features': None }

  if 'search' in request.GET:
    animals = Animal.objects.all()
    searched_animal = request.GET['search']
    features = animals.filter(name__icontains=searched_animal)
    context = { 'features': features }

  return render(request, 'index.html', context)
