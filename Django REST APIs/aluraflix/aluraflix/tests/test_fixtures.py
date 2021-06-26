from django.test import TestCase
from aluraflix.models import Programa

class FixuresTestCase(TestCase):
  fixtures = ['programas_iniciais']

  def test_verifica_carregamento_das_fixtures(self):
    """Verifica se o carregamento das fixtures está OK"""
    programa_bizarro = Programa.objects.get(pk=1)
    total_programas = Programa.objects.all()

    self.assertEqual(programa_bizarro.titulo, 'Coisas bizarras')
    self.assertEqual(len(total_programas), 9)
