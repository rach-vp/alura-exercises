from django.db import models

class Client(models.Model):
  name = models.CharField(max_length=100)
  email = models.EmailField(max_length=50, blank=False, unique=True)
  cpf = models.CharField(max_length=11, unique=True)
  rg = models.CharField(max_length=9, unique=True)
  phone_number = models.CharField(max_length=14)
  active = models.BooleanField()

  def __str__(self):
    return self.name
