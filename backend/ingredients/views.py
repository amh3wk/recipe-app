from django.shortcuts import render
from rest_framework import viewsets
from .models import Ingredient 
from .serializers import IngredientSerializer 
# Create your views here.

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by("name")
    serializer_class = IngredientSerializer