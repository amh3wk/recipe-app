from django.shortcuts import render
from rest_framework import generics
from .models import Recipe, RecipeIngredient
from .serializers import RecipeSerializer, RecipeIngredientSerializer
# Create your views here.

class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all().order_by("-created_at")
    serializer_class = RecipeSerializer

class RecipeIngredientListCreateView(generics.ListCreateAPIView):
    queryset = RecipeIngredient.objects.select_related("recipe", "ingredient")
    serializer_class = RecipeIngredientSerializer