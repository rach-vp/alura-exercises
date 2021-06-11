from django.contrib import admin
from django.urls import path, include
from school import views as school_viewsets
from rest_framework import routers

router = routers.DefaultRouter()
router.register('students', school_viewsets.StudentsViewSet, basename='Students')
router.register('courses', school_viewsets.CourseViewSet, basename='Course')
router.register('enrollments', school_viewsets.EnrollmentViewSet, basename='Enrollment')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('students/<int:pk>/enrollments', school_viewsets.EnrollmentPerStudent.as_view()),
    path('courses/<int:pk>/enrollments', school_viewsets.StudentsEnrolledInCourse.as_view()),
]
