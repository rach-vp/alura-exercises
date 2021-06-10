from rest_framework import viewsets, filters
from clients.models import Client
from clients.serializers import ClientSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class ClientViewSet(viewsets.ModelViewSet):
  """Display clients"""
  queryset = Client.objects.all()
  serializer_class = ClientSerializer
  filter_backends = [
    DjangoFilterBackend,
    filters.OrderingFilter,
    filters.SearchFilter,
  ]
  ordering_fields = ['name']
  search_fields = ['name', 'cpf']
  filterset_fields = ['active']

  authentication_classes = [BasicAuthentication]
  permission_classes = [IsAuthenticated]
