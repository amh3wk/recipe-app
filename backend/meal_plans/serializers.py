from rest_framework import serializers
from .models import MealPlan, MealPlanItem

class MealPlanItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealPlanItem
        fields = [
            'id',
            'meal_plan',
            'recipe',
            'recipe_name',
            'text',
            'date',
            'meal',
            'position',
            'created_at',
        ]

class MealPlanSerializer(serializers.ModelSerializer):
    items = MealPlanItemSerializer(
        many=True, 
        read_only=True
    )

    class Meta:
        model = MealPlan
        fields = [
            'id',
            'week_start',
            'created_at',
            'items',
        ]