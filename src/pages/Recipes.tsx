import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Clock, Users, ShoppingCart } from "lucide-react";
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
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Recipes</h1>
          <p className="text-muted-foreground">Manage your recipe collection</p>
        </div>
        <Button asChild>
          <Link to="/add-recipe">
            <Plus className="mr-2 h-4 w-4" />
            Add Recipe
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipes or ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{recipe.title}</CardTitle>
              <CardDescription>{recipe.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {recipe.cookTime}
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {recipe.servings} servings
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Ingredients:</p>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{recipe.ingredients.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Recipe
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => addToGroceryList(recipe.ingredients)}
                  className="flex-1"
                >
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  Add to List
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No recipes found</p>
          <Button asChild>
            <Link to="/add-recipe">Create your first recipe</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Recipes;