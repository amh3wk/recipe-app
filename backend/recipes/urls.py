from django.urls import path
from .views import RecipeListCreateView, RecipeIngredientListCreateView

urlpatterns = [
    path("recipes/", RecipeListCreateView.as_view(), name="recipe-list-create"),
    path("recipe-ingredients/", RecipeIngredientListCreateView.as_view(), name="recipe-ingredient-list-create"),
]