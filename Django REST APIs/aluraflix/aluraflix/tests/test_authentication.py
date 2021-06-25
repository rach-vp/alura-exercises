from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

class AuthenticationUserTestCase(APITestCase):

  def setUp(self):
    self.username = 'test_user'
    self.password = '123456'
    self.user = User.objects.create_user(self.username, password=self.password)
    self.list_url = reverse('programas-list')

  def test_autenticacao_com_credenciais_corretas(self):
    """Verifica se a autenticação de um usuário com as credenciais corretas está correta"""
    user = authenticate(username=self.username, password=self.password)

    self.assertTrue(user is not None)
    self.assertTrue(user.is_authenticated)

  def test_autenticacao_com_username_incorreto(self):
    """Verifica se a autenticação de um usuário com username incorreto é negada"""
    user = authenticate(username='wrong_username', password=self.password)

    self.assertTrue(user is None)
    self.assertFalse(hasattr(user, 'is_authenticated'))

  def test_autenticacao_com_senha_incorreta(self):
    """Verifica se a autenticação de um usuário com senha incorreta é negada"""
    user = authenticate(username=self.username, password='wrong_password')

    self.assertTrue(user is None)
    self.assertFalse(hasattr(user, 'is_authenticated'))

  def test_usuario_nao_autenticado_tem_request_negada(self):
    """Verifica se um usuário não autenticado não consegue fazer uma requisição GET"""
    response = self.client.get(self.list_url)

    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

  def test_usuario_autenticado_tem_request_autorizada(self):
    """Verifica se um usuário autenticado consegue fazer uma requisição GET"""
    self.client.force_authenticate(self.user)
    response = self.client.get(self.list_url)

    self.assertEqual(response.status_code, status.HTTP_200_OK)
