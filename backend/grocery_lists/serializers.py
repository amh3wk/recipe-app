from rest_framework import serializers 
from django.db import transaction
from .models import GroceryList, GroceryListItem, GroceryListRecipe
from ingredients.models import Ingredient

class GroceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryList
        fields = "__all__"

class GroceryListItemSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.CharField(
        write_only=True,
    )
    class Meta:
        model = GroceryListItem
        fields = [
            "id",
            "ingredient",
            "ingredient_name",
            "quantity",
            "unit",
            "checked",
            "grocery_list",
        ]
        read_only_fields = [
            "id",
            "ingredient",
        ]

    @transaction.atomic
    def create(self, validated_data):
        ingredient_name = validated_data.pop("ingredient_name")

        #SELECT * FROM ingredient WHERE LOWER(name) = LOWER("Tomatoes")LIMIT 1
        ingredient = Ingredient.objects.filter(name__iexact=ingredient_name).first()
        if ingredient is None:
            ingredient = Ingredient.objects.create(
                name=ingredient_name
            )

        return GroceryListItem.objects.create(
            ingredient=ingredient, **validated_data
        )
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["ingredient_name"] = instance.ingredient.name
        return representation

class GroceryListRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryListRecipe
        fields = "__all__"