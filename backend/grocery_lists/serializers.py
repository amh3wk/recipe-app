from rest_framework import serializers 
from .models import GroceryList, GroceryListItem, GroceryListRecipe
from ingredients.models import Ingredient

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