from django.shortcuts import render
from rest_framework import viewsets, status
from django.db import transaction
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import GroceryList, GroceryListItem, GroceryListRecipe
from recipes.models import Recipe, RecipeIngredient
from .serializers import GroceryListSerializer, GroceryListItemSerializer, GroceryListRecipeSerializer
# Create your views here.

class GroceryListViewSet(viewsets.ModelViewSet):
    queryset = GroceryList.objects.all()
    serializer_class = GroceryListSerializer

    @action(detail=True, methods=["post"], url_path="add-recipe")
    def add_recipe(self, request, pk=None):
        grocery_list = self.get_object()
        recipe_id = request.data.get("recipe_id")

        if not recipe_id:
            return Response({"error": "Recipe ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND)

        grocery_list_recipe, created = GroceryListRecipe.objects.get_or_create(
            grocery_list=grocery_list, 
            recipe=recipe
        )
        serializer = GroceryListRecipeSerializer(grocery_list_recipe)
        recipe_ingredients = RecipeIngredient.objects.filter(recipe=recipe)
        for recipe_ingredient in recipe_ingredients:
            GroceryListItem.objects.get_or_create(
                grocery_list=grocery_list,
                ingredient=recipe_ingredient.ingredient,
                quantity=recipe_ingredient.quantity,
                unit=recipe_ingredient.unit
            )
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["delete"], url_path="remove-recipe")
    @transaction.atomic
    def remove_recipe(self, request, pk=None):
        grocery_list = self.get_object()
        recipe_id = request.data.get("recipe_id")

        if not recipe_id:
            return Response({"error": "Recipe ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            grocery_list_recipe = GroceryListRecipe.objects.get(
                grocery_list=grocery_list, 
                recipe=recipe
            )
            recipe_ingredients = RecipeIngredient.objects.filter(recipe=recipe)
            for recipe_ingredient in recipe_ingredients:
                GroceryListItem.objects.filter(
                    grocery_list=grocery_list,
                    ingredient=recipe_ingredient.ingredient,
                    quantity=recipe_ingredient.quantity,
                    unit=recipe_ingredient.unit
                ).delete()
            grocery_list_recipe.delete()
            return Response({"message": "Recipe removed from grocery list."}, status=status.HTTP_200_OK)
        except GroceryListRecipe.DoesNotExist:
            return Response({"error": "Recipe not associated with this grocery list."}, status=status.HTTP_404_NOT_FOUND)

class GroceryListItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryListItem.objects.all()
    serializer_class = GroceryListItemSerializer

class GroceryListRecipeViewSet(viewsets.ModelViewSet):
    queryset = GroceryListRecipe.objects.all()
    serializer_class = GroceryListRecipeSerializer
