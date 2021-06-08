from django.contrib import admin
from clients.models import Client

class Clients(admin.ModelAdmin):
  list_display = ('id', 'name', 'email', 'cpf', 'active')
  list_display_links = ('id', 'name')
  list_filter = ('active',)
  list_editable = ('active',)
  list_per_page = 10
  search_fields = ('name',)

admin.site.register(Client, Clients)
