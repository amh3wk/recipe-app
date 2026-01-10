from django.contrib import admin
from .models import Recipe, Ingredient, GroceryList, GroceryListItem, RecipeIngredient, GroceryListRecipe
admin.site.register([Recipe, Ingredient, GroceryList, GroceryListItem, RecipeIngredient, GroceryListRecipe])
