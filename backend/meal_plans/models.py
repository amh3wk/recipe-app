from django.db import models
from recipes.models import Recipe

class MealPlan(models.Model):
    week_start = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    
class MealPlanItem(models.Model):
    MEAL_CHOICES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
    ]

    meal_plan = models.ForeignKey(
        MealPlan, 
        on_delete=models.CASCADE, 
        related_name='items'
    )
    recipe = models.ForeignKey(
        Recipe, 
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    text = models.CharField(
        max_length=255, 
        blank=True
    )

    date = models.DateField()

    meal = models.CharField(
        max_length=10,
        choices=MEAL_CHOICES,
    )

    position = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.recipe:
            return f"{self.recipe.name} on {self.date} ({self.meal})"
        return f"{self.text} on {self.date} ({self.meal})"