from rest_framework import viewsets
from recipes.models import Recipe, Ingredient, RecipeIngredient, GroceryList, GroceryListItem, GroceryListRecipe
from .serializers import (
    RecipeSerializer, IngredientSerializer, RecipeIngredientSerializer,
    GroceryListSerializer, GroceryListItemSerializer, GroceryListRecipeSerializer
)

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by("name")
    serializer_class = IngredientSerializer
    search_fields = ["name"]
    ordering_fields = ["name", "id"]


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    search_fields = ["title"]
    ordering_fields = ["title", "id",]
    filterset_fields = ["id", "title", "user"]

class RecipeIngredientViewSet(viewsets.ModelViewSet):
    queryset = RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer

class GroceryListViewSet(viewsets.ModelViewSet):
    queryset = GroceryList.objects.all()
    serializer_class = GroceryListSerializer

class GroceryListItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryListItem.objects.all()
    serializer_class = GroceryListItemSerializer

class GroceryListRecipeViewSet(viewsets.ModelViewSet):
    queryset = GroceryListRecipe.objects.all()
    serializer_class = GroceryListRecipeSerializer
