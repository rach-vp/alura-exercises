from django.contrib import admin
from school.models import Student, Course, Enrollment

class Students(admin.ModelAdmin):
  list_display = ('id', 'name', 'cpf', 'birth_date')
  list_display_links = ('id', 'name')
  search_fields = ('name', )
  list_per_page = 20
  sortable_by = ('name', 'birth_date')

admin.site.register(Student, Students)

class Courses(admin.ModelAdmin):
  list_display = ('id', 'code', 'title', 'level', 'description')
  list_display_links = ('id', 'code', 'title')
  search_fields = ('code', 'title')
  list_per_page = 10
  sortable_by = ('title', 'level')
  list_filter = ('level', )

admin.site.register(Course, Courses)

class Enrollments(admin.ModelAdmin):
  list_display = ('id', 'student', 'course', 'term')
  list_display_links = ('id', )
  list_filter = ('course', 'term')
  sortable_by = ('course', 'term')
  list_per_page = 25

admin.site.register(Enrollment, Enrollments)