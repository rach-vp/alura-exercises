from rest_framework.test import APITestCase
from rest_framework import status
from school.models import Course
from django.urls import reverse

class CoursesTestCase(APITestCase):
  def setUp(self):
    self.list_url = reverse('Courses-list')
    self.course_1 = Course.objects.create(
      code='CTT1', title='Course Test Test 01', description='Test 1', level='B'
    )
    self.course_1 = Course.objects.create(
      code='CTT3', title='Course Test Test 03', description='Test 3', level='I'
    )
  def test_get_request_to_list_all_courses(self):
    """Test to check if the GET request is listing all courses that are registered"""

    response = self.client.get(self.list_url)

    self.assertEquals(response.status_code, status.HTTP_200_OK)



  def test_post_request_to_create_course(self):
    """Test to check if the POST request is creating a course"""
    data = {
      'code': 'CTT2',
      'title': 'Course Test Test 02',
      'description': 'Test 2',
      'level': 'A'
    }

    course_prev_amount = len(Course.objects.all())
    response = self.client.post(self.list_url, data=data)
    course_next_amount = len(Course.objects.all())

    self.assertEquals(response.status_code, status.HTTP_201_CREATED)
    self.assertEquals(course_next_amount, course_prev_amount + 1)

  def test_delete_request_to_remove_course(self):
    """Test to check if the DELETE request is removing a course from the database"""

    course_prev_amount = len(Course.objects.all())
    response = self.client.delete('/courses/1/')
    course_next_amount = len(Course.objects.all())

    self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
    self.assertEquals(course_next_amount, course_prev_amount - 1)

  def test_put_request_to_remove_course(self):
    """Test to check if the PUT request is update a course"""
    data = {
      'code': 'CTT1',
      'title': 'Course Test 1',
      'description': 'Updating course',
      'level': 'I'
    }

    course_prev_amount = len(Course.objects.all())
    response = self.client.put('/courses/1/', data=data)
    course_next_amount = len(Course.objects.all())

    self.assertEquals(response.status_code, status.HTTP_200_OK)
    self.assertEquals(course_next_amount, course_prev_amount)
