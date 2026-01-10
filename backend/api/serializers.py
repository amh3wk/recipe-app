from rest_framework import serializers
from recipes.models import Recipe, Ingredient, RecipeIngredient, GroceryList, GroceryListItem, GroceryListRecipe

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = "__all__"

class GroceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryList
        fields = "__all__"

class GroceryListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryListItem
        fields = "__all__"

class GroceryListRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryListRecipe
        fields = "__all__"
