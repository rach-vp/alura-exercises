from rest_framework import serializers
from school.models import Student, Course, Enrollment

class StudentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Student
    fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Course
    fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Enrollment
    fields = '__all__'

class EnrollmentPerStudentSerializer(serializers.ModelSerializer):
  course = serializers.ReadOnlyField(source='course.description')
  term = serializers.SerializerMethodField()

  def get_term(self, obj):
    return obj.get_term_display()

  class Meta:
    model = Enrollment
    fields = ['course', 'term']

class StudentsEnrolledInCourseSerializer(serializers.ModelSerializer):
  student_name = serializers.ReadOnlyField(source='student.name')

  class Meta:
    model = Enrollment
    fields = ['student_name']
