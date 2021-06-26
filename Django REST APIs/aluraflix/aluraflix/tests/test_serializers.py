from django.test import TestCase
from aluraflix.models import Programa
from aluraflix.serializers import ProgramaSerializer

class ProgramaSerializerTestCase(TestCase):

  def setUp(self):
    self.programa = Programa(
      titulo='Procurando Nemo',
      data_lancamento='2003-07-04',
      tipo='F',
      likes=2310,
      dislikes=15,
    )

    self.serializer = ProgramaSerializer(instance=self.programa)

  def test_campos_serializados(self):
    """Teste que verifica os campos que estão sendo serializados"""
    data = self.serializer.data

    self.assertEqual(set(data.keys()), set(['titulo', 'data_lancamento', 'tipo', 'likes']))

  def test_conteudo_dos_campos_serializados(self):
    """Teste que verifica o conteúdo dos campos que estão sendo serializados"""
    data = self.serializer.data

    self.assertEqual(data['titulo'], self.programa.titulo)
    self.assertEqual(data['data_lancamento'], self.programa.data_lancamento)
    self.assertEqual(data['tipo'], self.programa.tipo)
    self.assertEqual(data['likes'], self.programa.likes)
