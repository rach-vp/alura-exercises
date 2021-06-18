from django.contrib import admin
from django.urls import path, include
from school import views as school_viewsets
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register('students', school_viewsets.StudentsViewSet, basename='Students')
router.register('courses', school_viewsets.CourseViewSet, basename='Courses')
router.register('enrollments', school_viewsets.EnrollmentViewSet, basename='Enrollments')

urlpatterns = [
    path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('control/', admin.site.urls),
    path('', include(router.urls)),
    path('students/<int:pk>/enrollments', school_viewsets.EnrollmentPerStudent.as_view()),
    path('courses/<int:pk>/enrollments', school_viewsets.StudentsEnrolledInCourse.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
