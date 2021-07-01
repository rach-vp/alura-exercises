from django.test import TestCase, RequestFactory
from animals.models import Animal

class AnimalModelTestCase(TestCase):
  def setUp(self):
    self.animal = Animal.objects.create(
      name='Lion',
      predator=True,
      poisonous=False,
      domestic=False,
    )

  def test_if_lion_exists_in_database(self):
    """Test if animal is registered in database with its respective features"""

    self.assertEqual(self.animal.name, 'Lion')
    self.assertTrue(self.animal.predator)
    self.assertFalse(self.animal.poisonous)
    self.assertFalse(self.animal.domestic)
