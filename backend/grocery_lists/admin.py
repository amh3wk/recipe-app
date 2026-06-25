from django.contrib import admin
from .models import GroceryList, GroceryListItem, GroceryListRecipe
# Register your models here.


admin.site.register(GroceryList)
admin.site.register(GroceryListItem)
admin.site.register(GroceryListRecipe)