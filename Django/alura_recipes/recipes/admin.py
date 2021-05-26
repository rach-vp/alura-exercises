from django.contrib import admin
from .models import Recipe

class RecipesList(admin.ModelAdmin):
  list_display = ('id', 'recipe_name', 'category', 'created_at')
  list_display_links = ('recipe_name',)
  search_fields = ('recipe_name',)
  list_filter = ('category',)
  sortable_by = ('recipe_name', 'created_at')
  list_per_page = 10

admin.site.register(Recipe, RecipesList)
