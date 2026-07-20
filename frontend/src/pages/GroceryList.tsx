import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGroceries, useRecipes } from "@/lib/store";
import { getRecipes } from "@/api/recipes";
import { getGroceryLists, toggleGroceryListItem, createGroceryListItem, getGroceryListRecipes, addRecipeToGroceryList, deleteGroceryListItem, deleteGroceryListRecipe } from "@/api/groceryLists";

const recipeSuggestions = [
  { id: 1, name: "Pasta Primavera", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=100&h=100&fit=crop" },
  { id: 2, name: "Caesar Salad", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop" },
  { id: 3, name: "Grilled Fish", image: "https://images.unsplash.com/photo-1559847844-d826dec4ca58?w=100&h=100&fit=crop" },
];
type ApiRecipe = {
  id: number;
  name: string;
};
type ApiGroceryListItems = {
  id: number;
  ingredient: number;
  ingredient_name: string;
  checked: boolean;
  quantity: number;
  unit: string;
};

type ApiGroceryListRecipes = {
  id: number;
  recipe: number;
  recipe_name: string;
  grocery_list: number;
};

const GroceryList = () => {
  const { items, addItem, remove } = useGroceries();
  const { recipes, addRecipe } = useRecipes();
  const [apiRecipes, setApiRecipes] = useState<ApiRecipe[]>([]);
  const [apiGroceryListItems, setApiGroceryListItems] = useState<ApiGroceryListItems[]>([]);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [rTitle, setRTitle] = useState("");
  const [rDescription, setRDescription] = useState("");
  const [rIngredients, setRIngredients] = useState("");
  const [newRecipe, setNewRecipe] = useState("");
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [apiGroceryListRecipes, setApiGroceryListRecipes] = useState<ApiGroceryListRecipes[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchGroceryLists() {
      try {
        const data = await getGroceryLists();
        console.log("grocery items from API:", data);
        setApiGroceryListItems(data);
      } catch (error) {
        console.error("Failed to fetch grocery items:", error);
      }
    }

    async function loadRecipes() {
      try {
        const data = await getRecipes();
        console.log("recipes from API:", data);
        setApiRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    }

    async function fetchGroceryListRecipes(groceryListId: number) {
      try {
        const data = await getGroceryListRecipes(groceryListId); 
        console.log("grocery list recipes from API:", data);
        setApiGroceryListRecipes(data);
      } catch (error) {
        console.error("Failed to fetch grocery list recipes:", error);
      }
    }
    fetchGroceryLists();
    loadRecipes();
    fetchGroceryListRecipes(1); 
  }, []);

  const handleToggleGroceryItem = async (itemId: number) => {
    const item = apiGroceryListItems.find((item) => item.id === itemId);
    if (!item) return;

    const newCheckedValue = !item.checked;
    try {
      const updatedItem = await toggleGroceryListItem(itemId, newCheckedValue);
      setApiGroceryListItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? updatedItem : item
        )
      );
    } catch (error) {
      console.error("Failed to toggle grocery item:", error);
    }

  }

  const handleShowIngredientInput = () => {
    setIsAddingIngredient(true);
    setNewIngredientName("");
  };
  const handleSaveIngredient = async () => {
    const ingredientName = newIngredientName.trim();

    if (!ingredientName) {
      setIsAddingIngredient(false);
      return;
    }

    // Call your create-grocery-item API here.
    console.log("New ingredient:", ingredientName);
    try {
      const new_item = await createGroceryListItem({
        ingredient_name: ingredientName,
        quantity: 1,
        unit: "",
        grocery_list: 1,
      });
      setApiGroceryListItems((prevItems) => [...prevItems, new_item]);
      setNewIngredientName("");
      setIsAddingIngredient(true);
    } catch (error) {
      console.error("Failed to create grocery item:", error);
    }
  };
  const handleAddRecipe = async () => {
    
    try {
      const addedRecipe = await addRecipeToGroceryList(
        1,
        parseInt(newRecipe),
      );
      console.log("addedRecipe:", addedRecipe);
      setApiGroceryListRecipes((prevRecipes) => [...prevRecipes, addedRecipe]);
      const updatedGroceryListItems = await getGroceryLists();
      setApiGroceryListItems(updatedGroceryListItems);
      toast({ title: "Recipe added", description: `${rTitle} saved to your recipes.` });
      setNewRecipe("");
      setRecipeOpen(false);
    } catch (error) {
      console.error("Failed to add recipe to grocery list:", error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await deleteGroceryListItem(itemId);
      setApiGroceryListItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to delete grocery item:", error);
    }
  };

  const handleDeleteRecipe = async (recipeId: number) => {
    try {
      console.log("Deleting recipe with ID:", recipeId);
      await deleteGroceryListRecipe(
        1,
        recipeId
      );
      setApiGroceryListRecipes((currentRecipes) => currentRecipes.filter((recipe) => recipe.id !== recipeId));
      const updatedGroceryListItems = await getGroceryLists();
      setApiGroceryListItems(updatedGroceryListItems);
      const updatedGroceryListRecipes = await getGroceryListRecipes(1);
      setApiGroceryListRecipes(updatedGroceryListRecipes);
    } catch (error) {
      console.error("Failed to delete grocery list recipe:", error);
    }
  };
  // console.log("newRecipe:", newRecipe);
  // console.log("apiGroceryListRecipes:", apiGroceryListRecipes);
  return (
    <div className="container mx-auto px-4 py-6 pb-20 max-w-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-64 h-64 rounded-full bg-accent/30 blur-3xl pointer-events-none" />

      <h1 className="text-2xl font-bold mb-2 relative z-10">Grocery List</h1>
      <h2 className="text-lg font-medium text-muted-foreground mb-6 relative z-10">Weekly</h2>

      <Card className="mb-6 liquid-glass relative z-10">
        <CardHeader>
          <CardTitle className="text-lg">Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {apiGroceryListItems.length === 0 && (
            <p className="text-sm text-muted-foreground">No items yet. Tap + to add one.</p>
          )}
          {apiGroceryListItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 group">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggleGroceryItem(item.id)}
                className="w-4 h-4"
              />
              <span className={`flex-1 ${item.checked ? "line-through text-muted-foreground" : ""}`}>
                {item.ingredient_name}
              </span>
              <span className="text-sm text-muted-foreground">{item.quantity} {item.unit}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteItem(item.id)}
                className="opacity-0 group-hover:opacity-100 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {isAddingIngredient && (
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                disabled
                className="w-4 h-4"
              />

              <Input
                value={newIngredientName}
                onChange={(event) => setNewIngredientName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSaveIngredient();
                  }

                  if (event.key === "Escape") {
                    setNewIngredientName("");
                    setIsAddingIngredient(false);
                  }
                }}
                onBlur={handleSaveIngredient}
                placeholder="Ingredient name"
                className="h-8 flex-1"
                autoFocus
              />
            </div>
          )}

          {!isAddingIngredient && (
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-md border-dashed"
              aria-label="Add ingredient"
              onClick={handleShowIngredientInput}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6 liquid-glass relative z-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Recipes</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setRecipeOpen(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Recipe
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {apiGroceryListRecipes.length === 0 && (
            <p className="text-sm text-muted-foreground">No recipes yet.</p>
          )}
          {apiGroceryListRecipes.map((recipe) => (
            <div key={recipe.id} className="flex items-center justify-between space-x-3 group">
              <div className="flex items-center space-x-3">
                <input type="radio" className="w-4 h-4" />
                <span>{recipe.recipe_name}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteRecipe(recipe.recipe)}
                className="opacity-0 group-hover:opacity-100 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Recipe Suggestions</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {recipeSuggestions.map((recipe) => (
            <div key={recipe.id} className="flex-shrink-0 w-24">
              <div className="w-20 h-20 bg-muted rounded-lg mb-2 overflow-hidden">
                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-center text-muted-foreground">{recipe.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={recipeOpen} onOpenChange={setRecipeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Recipe</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="gl-r-recipe">Recipes</Label>
              <Select value={newRecipe} onValueChange={setNewRecipe}>
                <SelectTrigger id="gl-r-recipe">
                  <SelectValue placeholder="Select a recipe" />
                </SelectTrigger>
                <SelectContent>
                  {apiRecipes.map((recipe) => (
                    <SelectItem key={recipe.id} value={recipe.id.toString()}>
                      {recipe.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRecipeOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRecipe}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default GroceryList;
