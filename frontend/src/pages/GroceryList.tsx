import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGroceries, useRecipes } from "@/lib/store";

const recipeSuggestions = [
  { id: 1, name: "Pasta Primavera", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=100&h=100&fit=crop" },
  { id: 2, name: "Caesar Salad", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop" },
  { id: 3, name: "Grilled Fish", image: "https://images.unsplash.com/photo-1559847844-d826dec4ca58?w=100&h=100&fit=crop" },
];

const GroceryList = () => {
  const { items, addItem, toggle, remove } = useGroceries();
  const { recipes, addRecipe } = useRecipes();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [rTitle, setRTitle] = useState("");
  const [rDescription, setRDescription] = useState("");
  const [rIngredients, setRIngredients] = useState("");
  const { toast } = useToast();

  const handleAdd = () => {
    if (!newName.trim()) return;
    addItem(newName);
    toast({ title: "Item added", description: `${newName} added to your list.` });
    setNewName("");
    setOpen(false);
  };

  const handleAddRecipe = () => {
    if (!rTitle.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    const ingredients = rIngredients.split(",").map((s) => s.trim()).filter(Boolean);
    addRecipe({
      title: rTitle.trim(),
      description: rDescription.trim(),
      ingredients,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
    });
    toast({ title: "Recipe added", description: `${rTitle} saved to your recipes.` });
    setRTitle("");
    setRDescription("");
    setRIngredients("");
    setRecipeOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-32 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Grocery List</h1>
      <h2 className="text-lg font-medium text-muted-foreground mb-6">Weekly</h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">No items yet. Add one below.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 group">
              <input
                type="radio"
                checked={item.purchased}
                onChange={() => toggle(item.id)}
                className="w-4 h-4"
              />
              <span className={`flex-1 ${item.purchased ? "line-through text-muted-foreground" : ""}`}>
                {item.name}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => remove(item.id)}
                className="opacity-0 group-hover:opacity-100 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Recipes</CardTitle>
          <DropdownMenu open={recipeOpen} onOpenChange={setRecipeOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Add Recipe
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-4" align="end">
              <h3 className="text-sm font-semibold mb-3">Add Recipe</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="gl-r-title">Title</Label>
                  <Input id="gl-r-title" value={rTitle} onChange={(e) => setRTitle(e.target.value)} placeholder="e.g., Tomato Soup" autoFocus />
                </div>
                <div>
                  <Label htmlFor="gl-r-desc">Description</Label>
                  <Input id="gl-r-desc" value={rDescription} onChange={(e) => setRDescription(e.target.value)} placeholder="Short description" />
                </div>
                <div>
                  <Label htmlFor="gl-r-ing">Ingredients (comma separated)</Label>
                  <Textarea id="gl-r-ing" value={rIngredients} onChange={(e) => setRIngredients(e.target.value)} placeholder="tomatoes, onion, garlic" rows={3} />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setRecipeOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={handleAddRecipe}>Save</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="space-y-3">
          {recipes.length === 0 && (
            <p className="text-sm text-muted-foreground">No recipes yet.</p>
          )}
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex items-center space-x-3">
              <input type="radio" className="w-4 h-4" />
              <span>{recipe.title}</span>
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

      <div className="fixed bottom-20 left-4 right-4 max-w-2xl mx-auto">
        <Button onClick={() => setOpen(true)} className="w-full h-12 text-lg" size="lg">
          Add Ingredient
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Ingredient</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="e.g., Tomatoes"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default GroceryList;
