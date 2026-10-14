from rest_framework.routers import DefaultRouter

from .views import MealPlanViewSet, MealPlanItemViewSet


router = DefaultRouter()

router.register(
    r"meal-plans",
    MealPlanViewSet,
)

router.register(
    r"meal-plan-items",
    MealPlanItemViewSet,
)

urlpatterns = router.urls