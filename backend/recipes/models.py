from django.db import models
from ingredients.models import Ingredient

# Create your models here.
class Recipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name="recipe_ingredients"
    )
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        related_name="ingredient_recipes"
    )
    quantity = models.FloatField()
    unit = models.CharField(max_length=50, blank=True)

    class Meta:
        unique_together = ("recipe", "ingredient")

    def __str__(self):
        return f"{self.quantity} {self.unit} {self.ingredient.name} for {self.recipe.name}"