# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class GroceryList(models.Model):
    name = models.TextField()
    user = models.ForeignKey('Users', models.DO_NOTHING)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'grocery_list'


class GroceryListItem(models.Model):
    grocery_list = models.ForeignKey(GroceryList, models.DO_NOTHING)
    ingredient = models.ForeignKey('Ingredient', models.DO_NOTHING)
    quantity = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    unit = models.TextField()
    from_recipe = models.ForeignKey('Recipe', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'grocery_list_item'


class GroceryListRecipe(models.Model):
    grocery_list = models.ForeignKey(GroceryList, models.DO_NOTHING)
    recipe = models.ForeignKey('Recipe', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'grocery_list_recipe'


class Ingredient(models.Model):
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'ingredient'


class Recipe(models.Model):
    title = models.TextField()
    user = models.ForeignKey('Users', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'recipe'


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, models.DO_NOTHING)
    ingredient = models.ForeignKey(Ingredient, models.DO_NOTHING)
    quantity = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    unit = models.TextField()

    class Meta:
        managed = False
        db_table = 'recipe_ingredient'


class Users(models.Model):
    username = models.TextField(unique=True)
    password = models.TextField()

    class Meta:
        managed = False
        db_table = 'users'
