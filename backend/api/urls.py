from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    IngredientViewSet, RecipeViewSet, RecipeIngredientViewSet,
    GroceryListViewSet, GroceryListItemViewSet, GroceryListRecipeViewSet
)

router = DefaultRouter()
router.register(r"ingredients", IngredientViewSet)
router.register(r"recipes", RecipeViewSet)
router.register(r"recipe-ingredients", RecipeIngredientViewSet)
router.register(r"grocery-lists", GroceryListViewSet)
router.register(r"grocery-list-items", GroceryListItemViewSet)
router.register(r"grocery-list-recipes", GroceryListRecipeViewSet)

urlpatterns = [path("", include(router.urls))]
