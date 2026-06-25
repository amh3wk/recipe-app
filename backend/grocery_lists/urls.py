from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import GroceryListViewSet, GroceryListItemViewSet, GroceryListRecipeViewSet

router = DefaultRouter()
router.register(r"grocery-lists", GroceryListViewSet)
router.register(r"grocery-list-items", GroceryListItemViewSet)
router.register(r"grocery-list-recipes", GroceryListRecipeViewSet)


urlpatterns = router.urls