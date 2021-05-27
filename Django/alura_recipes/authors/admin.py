from django.contrib import admin
from .models import Author

class AuthorsList(admin.ModelAdmin):
  list_display = ('id', 'name')
  list_display_links = ('name',)
  search_fields = ('name',)
  sortable_by = ('name',)
  list_per_page = 10

admin.site.register(Author, AuthorsList)
