from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import GroceryList, GroceryListItem, GroceryListRecipe
from .serializers import GroceryListSerializer, GroceryListItemSerializer, GroceryListRecipeSerializer
# Create your views here.

class GroceryListViewSet(viewsets.ModelViewSet):
    queryset = GroceryList.objects.all()
    serializer_class = GroceryListSerializer

class GroceryListItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryListItem.objects.all()
    serializer_class = GroceryListItemSerializer

class GroceryListRecipeViewSet(viewsets.ModelViewSet):
    queryset = GroceryListRecipe.objects.all()
    serializer_class = GroceryListRecipeSerializer
