from django.contrib import admin
from django.urls import path
from school import views as school_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('students/', school_views.students),
]
