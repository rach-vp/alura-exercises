from django.db import models
from datetime import datetime
from authors.models import Author

class Recipe(models.Model):
  author = models.ForeignKey(Author, on_delete=models.CASCADE)
  recipe_name = models.CharField(max_length=200)
  picture = models.ImageField(upload_to='pics/%d/%m/%Y/', blank=True)
  ingredients = models.TextField()
  instructions = models.TextField()
  time_prepare = models.IntegerField()
  portions = models.CharField(max_length=100)
  category = models.CharField(max_length=100)
  published = models.BooleanField(default=False)
  created_at = models.DateTimeField(default=datetime.now, blank = True)

  def __str__(self):
    return self.recipe_name
