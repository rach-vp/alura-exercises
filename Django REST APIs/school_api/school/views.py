from rest_framework import viewsets, generics
from school.models import Student, Course,Enrollment
from school.serializer import *
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class StudentsViewSet(viewsets.ModelViewSet):
  """Display all students"""
  queryset = Student.objects.all()
  authentication_classes = [BasicAuthentication]
  permission_classes = [IsAuthenticated]

  def get_serializer_class(self):
    return StudentSerializerV2 if self.request.version == 'v2' else StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
  """Display all courses"""
  queryset = Course.objects.all()
  serializer_class = CourseSerializer
  authentication_classes = [BasicAuthentication]
  permission_classes = [IsAuthenticated]

class EnrollmentViewSet(viewsets.ModelViewSet):
  """Display all enrollments"""
  queryset = Enrollment.objects.all()
  serializer_class = EnrollmentSerializer
  authentication_classes = [BasicAuthentication]
  permission_classes = [IsAuthenticated]

class EnrollmentPerStudent(generics.ListAPIView):
  """Display enrollments per student. An student ID must be provided"""
  def get_queryset(self):
    queryset = Enrollment.objects.filter(student=self.kwargs['pk'])
    return queryset

  serializer_class = EnrollmentPerStudentSerializer
  authentication_classes = [BasicAuthentication]
  permission_classes = [IsAuthenticated]

class StudentsEnrolledInCourse(generics.ListAPIView):
  """Display students who are enrolled in a course. Course ID mumst be provided"""
  def get_queryset(self):
    queryset = Enrollment.objects.filter(course=self.kwargs['pk'])
    return queryset

  serializer_class = StudentsEnrolledInCourseSerializer
  authentication_classes = [BasicAuthentication]
  permission_classes = [IsAuthenticated]