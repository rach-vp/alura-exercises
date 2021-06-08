from django.db import models

class Student(models.Model):
  name = models.CharField(max_length=100)
  rg = models.CharField(max_length=9)
  cpf = models.CharField(max_length=11)
  birth_date = models.DateField()

  def __str__(self):
    return self.name

class Course(models.Model):
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

class Enrollment(models.Model):
  TERM = (
    ('M', 'Morning'),
    ('A', 'Afternoon'),
    ('N', 'Night'),
  )

  student = models.ForeignKey(Student, on_delete=models.CASCADE)
  course = models.ForeignKey(Course, on_delete=models.CASCADE)
  term = models.CharField(max_length=1, choices=TERM, blank=False, null=False, default='M')
