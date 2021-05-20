from django.db import models
from datetime import datetime

class Recipe(models.Model):
  recipe_name = models.CharField(max_length=200)
  ingredients = models.TextField()
  instructions = models.TextField()
  time_prepare = models.IntegerField()
  portions = models.CharField(max_length=100)
  category = models.CharField(max_length=100)
  created_at = models.DateTimeField(default=datetime.now, blank = True)
