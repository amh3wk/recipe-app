from django.shortcuts import render
from rest_framework import viewsets, status
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

        GroceryListRecipe.objects.get_or_create(
            grocery_list=grocery_list, 
            recipe=recipe
        )
        recipe_ingredients = RecipeIngredient.objects.filter(recipe=recipe)
        for recipe_ingredient in recipe_ingredients:
            GroceryListItem.objects.get_or_create(
                grocery_list=grocery_list,
                ingredient=recipe_ingredient.ingredient,
                quantity=recipe_ingredient.quantity,
                unit=recipe_ingredient.unit
            )

        serializer = self.get_serializer(grocery_list)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GroceryListItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryListItem.objects.all()
    serializer_class = GroceryListItemSerializer

class GroceryListRecipeViewSet(viewsets.ModelViewSet):
    queryset = GroceryListRecipe.objects.all()
    serializer_class = GroceryListRecipeSerializer
