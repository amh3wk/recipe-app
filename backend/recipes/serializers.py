from rest_framework import serializers 
from .models import Recipe, RecipeIngredient 
from ingredients.models import Ingredient

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ["id", "name", "description", "created_at"]

class RecipeIngredientSerializer(serializers.ModelSerializer):
    #POST 
    recipe_id = serializers.PrimaryKeyRelatedField(
        source="recipe", 
        queryset=Recipe.objects.all(), 
        write_only=True
    )
    ingredient_id = serializers.PrimaryKeyRelatedField(
        source="ingredient", 
        queryset=Ingredient.objects.all(), 
        write_only=True
    )

    #GET
    recipe = serializers.StringRelatedField(read_only=True)
    ingredient = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = [
            "id",
            "recipe", "recipe_id",
            "ingredient", "ingredient_id",
            "quantity",
            "unit",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        from ingredients.models import Ingredient
        self.fields["ingredient_id"].queryset = Ingredient.objects.all()