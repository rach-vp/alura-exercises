from rest_framework import viewsets, generics
from school.models import Student, Course,Enrollment
from school.serializer import StudentSerializer, CourseSerializer, EnrollmentSerializer, EnrollmentPerStudentSerializer

class StudentsViewSet(viewsets.ModelViewSet):
  """Display all students"""
  queryset = Student.objects.all()
  serializer_class = StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
  """Display all courses"""
  queryset = Course.objects.all()
  serializer_class = CourseSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
  """Display all enrollments"""
  queryset = Enrollment.objects.all()
  serializer_class = EnrollmentSerializer

class EnrollmentPerStudent(generics.ListAPIView):
  """Display enrollments per student. An student ID must be provided"""
  def get_queryset(self):
    queryset = Enrollment.objects.filter(student=self.kwargs['pk'])
    return queryset

  serializer_class = EnrollmentPerStudentSerializer