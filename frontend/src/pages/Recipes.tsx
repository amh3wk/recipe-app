import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ChefHat } from "lucide-react";
import { useRecipes } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const Recipes = () => {
  const { recipes, addRecipe } = useRecipes();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    const ingredients = ingredientsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    addRecipe({
      title: title.trim(),
      description: description.trim(),
      ingredients,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
    });
    toast({ title: "Recipe added", description: `${title} saved to your recipes.` });
    setTitle("");
    setDescription("");
    setIngredientsText("");
    setOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-32 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Recipes</h1>

      <div className="space-y-4 mb-20">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex items-center p-4 hover:bg-accent/50 transition-colors">
            <div className="w-16 h-16 bg-muted rounded-lg mr-4 overflow-hidden flex-shrink-0">
              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{recipe.title}</h3>
              {recipe.description && (
                <p className="text-xs text-muted-foreground line-clamp-1">{recipe.description}</p>
              )}
            </div>
            <ChefHat className="h-5 w-5 text-muted-foreground" />
          </Card>
        ))}
      </div>

      <div className="fixed bottom-20 left-4 right-4 max-w-2xl mx-auto">
        <Button onClick={() => setOpen(true)} className="w-full h-12 text-lg" size="lg">
          Add Recipe
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Recipe</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="r-title">Title</Label>
              <Input id="r-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Tomato Soup" autoFocus />
            </div>
            <div>
              <Label htmlFor="r-desc">Description</Label>
              <Input id="r-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
            </div>
            <div>
              <Label htmlFor="r-ing">Ingredients (comma separated)</Label>
              <Textarea id="r-ing" value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)} placeholder="tomatoes, onion, garlic" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recipes;
