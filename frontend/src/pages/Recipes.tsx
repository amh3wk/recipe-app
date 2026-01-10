import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChefHat, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - in a real app, this would come from an API
const mockRecipes = [
  {
    id: 1,
    title: "Mediterranean Pasta Salad",
    description: "Fresh pasta with olives, tomatoes, and feta cheese",
    cookTime: "20 mins",
    servings: 4,
    ingredients: ["pasta", "olives", "tomatoes", "feta cheese", "olive oil"],
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    description: "Healthy grilled chicken with mixed greens and vegetables",
    cookTime: "30 mins",
    servings: 2,
    ingredients: ["chicken breast", "mixed greens", "tomatoes", "cucumber", "olive oil"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Vegetable Stir Fry",
    description: "Quick and colorful vegetable stir fry with ginger and soy sauce",
    cookTime: "15 mins",
    servings: 3,
    ingredients: ["bell peppers", "broccoli", "carrots", "ginger", "soy sauce"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop"
  }
];

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes] = useState(mockRecipes);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const addToGroceryList = (recipeIngredients: string[]) => {
    // In a real app, this would update the grocery list in a database
    console.log("Adding to grocery list:", recipeIngredients);
    // For now, we'll just show a success message
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">Recipes</h1>

      {/* Recipe Cards */}
      <div className="space-y-4 mb-20">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="flex items-center p-4 hover:bg-accent/50 transition-colors">
            <div className="w-16 h-16 bg-muted rounded-lg mr-4 overflow-hidden flex-shrink-0">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{recipe.title}</h3>
            </div>
            <ChefHat className="h-5 w-5 text-muted-foreground" />
          </Card>
        ))}
      </div>

      {/* Add Recipe Button */}
      <div className="fixed bottom-20 left-4 right-4">
        <Button asChild className="w-full h-12 text-lg" size="lg">
          <Link to="/add-recipe">
            Add Recipe
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Recipes;