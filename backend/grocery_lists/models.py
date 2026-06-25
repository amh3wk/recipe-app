from django.db import models
from ingredients.models import Ingredient
from recipes.models import Recipe
# Create your models here.


class GroceryList(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class GroceryListItem(models.Model):
    grocery_list = models.ForeignKey(
        GroceryList,
        on_delete=models.CASCADE,
        related_name="items"
    )
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE
    )
    quantity = models.FloatField()
    unit = models.CharField(max_length=50, blank=True)
    checked = models.BooleanField(default=False)

    class Meta:
        unique_together = ("grocery_list", "ingredient")

    def __str__(self):
        return f"{self.ingredient.name} ({self.grocery_list.name})"
    


class GroceryListRecipe(models.Model):
    grocery_list = models.ForeignKey(
        GroceryList,
        on_delete=models.CASCADE,
        related_name="recipes"
    )
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE
    )
    class Meta:
        unique_together = ("grocery_list", "recipe")

    def __str__(self):
        return f"{self.recipe.name} in {self.grocery_list.name}"