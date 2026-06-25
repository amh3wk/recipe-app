from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RecipeIngredientViewSet, RecipeViewSet

router = DefaultRouter()
router.register(r"recipes", RecipeViewSet)
router.register(r"recipe-ingredients", RecipeIngredientViewSet)


urlpatterns = router.urls