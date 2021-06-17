from django.db import models

class Student(models.Model):
  name = models.CharField(max_length=100, blank=False)
  rg = models.CharField(max_length=9, unique=True, blank=False)
  cpf = models.CharField(max_length=11, unique=True, blank=False)
  birth_date = models.DateField()
  phone_number = models.CharField(max_length=11, default="")
  picture = models.ImageField(blank=True)

  def __str__(self):
    return self.name

class Course(models.Model):
  LEVEL = (
    ('B', 'Basic'),
    ('I', 'Intermediate'),
    ('A', 'Advanced'),
  )

  code = models.CharField(max_length=10, blank=False)
  title = models.CharField(max_length=50, blank=False)
  description = models.CharField(max_length=200)
  level = models.CharField(max_length=1, choices=LEVEL, blank=False, null=False, default='B')

  def __str__(self):
    return self.title

class Enrollment(models.Model):
  TERM = (
    ('M', 'Morning'),
    ('A', 'Afternoon'),
    ('N', 'Night'),
  )

  student = models.ForeignKey(Student, on_delete=models.CASCADE, blank=False)
  course = models.ForeignKey(Course, on_delete=models.CASCADE, blank=False)
  term = models.CharField(max_length=1, choices=TERM, blank=False, null=False, default='M')
