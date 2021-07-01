from django.test import TestCase, RequestFactory
from django.db.models.query import QuerySet
from  animals.models import Animal

class IndexViewTextCase(TestCase):

  def setUp(self):
    self.factory = RequestFactory()
    self.animal = Animal.objects.create(
      name='platypus',
      predator=False,
      poisonous=True,
      domestic=False,
    )

  def test_index_view_return_features_of_animal(self):
    """Test if index returns the features of an animal searched"""
    response = self.client.get(
      '/',
      { 'search': 'platypus' },
    )
    feature_search = response.context['features']

    self.assertIs(type(feature_search), QuerySet)
    self.assertEqual(feature_search[0].name, 'platypus')
