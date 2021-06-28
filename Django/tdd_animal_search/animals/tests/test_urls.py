from django.test import TestCase, RequestFactory
from django.urls import reverse
from animals.views import index

class AnimalsUrlsTestCase(TestCase):

  def setUp(self):
    self.factory = RequestFactory()

  def test_route_url_use_view_index(self):
    """Test if app home uses uses index from the view"""
    request = self.factory.get('/')
    with self.assertTemplateUsed('index.html'):
      response = index(request)

      self.assertEqual(response.status_code, 200)
