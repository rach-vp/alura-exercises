from rest_framework import viewsets
from school.models import Student, Course,Enrollment
from school.serializer import StudentSerializer, CourseSerializer, EnrollmentSerializer

class StudentsViewSet(viewsets.ModelViewSet):
  """Display all students"""
  queryset = Student.objects.all()
  serializer_class = StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
  """Display all courses"""
  queryset = Course.objects.all()
  serializer_class = CourseSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
  """Display al enrollments"""
  queryset = Enrollment.objects.all()
  serializer_class = EnrollmentSerializer