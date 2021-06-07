from django.db import models

class Students(models.Model):
  name = models.CharField(max_length=100)
  rg = models.CharField(max_length=9)
  cpf = models.CharField(max_length=11)
  birth_date = models.DateField()

  def __str__(self):
    return self.name

class Courses(models.Model):
  LEVEL = (
    ('B', 'Basic'),
    ('I', 'Intermediate'),
    ('A', 'Advanced'),
  )

  code = models.CharField(max_length=10)
  title = models.CharField(max_length=50)
  description = models.CharField(max_length=200)
  level = models.CharField(max_length=1, choices=LEVEL, blank=False, null=False, default='B')

  def __str__(self):
    return self.title
