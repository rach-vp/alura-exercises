from django.db import models
from datetime import datetime
from authors.models import Author

class Recipe(models.Model):
  author = models.ForeignKey(Author, on_delete=models.CASCADE)
  recipe_name = models.CharField(max_length=200)
  ingredients = models.TextField()
  instructions = models.TextField()
  time_prepare = models.IntegerField()
  portions = models.CharField(max_length=100)
  category = models.CharField(max_length=100)
  published = models.BooleanField(default=False)
  created_at = models.DateTimeField(default=datetime.now, blank = True)
