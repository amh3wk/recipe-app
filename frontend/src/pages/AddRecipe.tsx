import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Camera, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState<Array<{name: string, quantity: string}>>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, {
        name: newIngredient.trim(),
        quantity: newQuantity.trim() || "1"
      }]);
      setNewIngredient("");
      setNewQuantity("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a recipe title.",
        variant: "destructive",
      });
      return;
    }

    if (ingredients.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one ingredient.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to a database
    const newRecipe = {
      id: Date.now(),
      title,
      description,
      instructions,
      cookTime,
      servings: parseInt(servings) || 1,
      ingredients: ingredients.map(ing => ing.name),
      createdAt: new Date().toISOString(),
    };
    
    console.log("New recipe:", newRecipe);
    
    toast({
      title: "Recipe saved!",
      description: "Your recipe has been added to your collection.",
    });
    
    navigate("/recipes");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Add New Recipe</h1>
        <p className="text-muted-foreground">Create a new recipe for your collection</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Recipe Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Mediterranean Pasta Salad"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Short Description</Label>
              <Input
                id="description"
                placeholder="Brief description of your recipe"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cookTime">Cook Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cookTime"
                    placeholder="e.g., 30 mins"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="servings">Servings</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="servings"
                    type="number"
                    placeholder="4"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="pl-10"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle>Ingredients *</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add ingredient form */}
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="Ingredient name"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                className="flex-1"
              />
              <Input
                placeholder="Quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                className="md:w-32"
              />
              <Button type="button" onClick={addIngredient} className="md:w-auto w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            
            {/* Ingredients list */}
            {ingredients.length > 0 && (
              <div className="space-y-2">
                <Label>Recipe Ingredients:</Label>
                <div className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{ingredient.name}</span>
                        <Badge variant="secondary">{ingredient.quantity}</Badge>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeIngredient(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="instructions">Cooking Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Step-by-step cooking instructions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={6}
              className="mt-2"
            />
          </CardContent>
        </Card>

        {/* Photo Upload Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Recipe Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Add a photo of your recipe</p>
              <p className="text-sm text-muted-foreground">Coming soon - photo upload feature</p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <Button type="submit" className="flex-1">
            Save Recipe
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/recipes")} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;