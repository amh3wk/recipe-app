import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChefHat } from "lucide-react";

// Mock data
const groceryItems = [
  { id: 1, name: "Milk", purchased: false },
  { id: 2, name: "Eggs", purchased: false },
  { id: 3, name: "Bread", purchased: false },
];

const selectedRecipes = [
  { id: 1, name: "Spaghetti Carbonara" },
  { id: 2, name: "Chicken Salad" },
];

const recipeSuggestions = [
  { id: 1, name: "Pasta Primavera", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=100&h=100&fit=crop" },
  { id: 2, name: "Caesar Salad", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop" },
  { id: 3, name: "Grilled Fish", image: "https://images.unsplash.com/photo-1559847844-d826dec4ca58?w=100&h=100&fit=crop" },
];

const Plan = () => {
  const [groceries, setGroceries] = useState(groceryItems);

  const togglePurchased = (id: number) => {
    setGroceries(groceries.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">Plan</h1>

      {/* Grocery List Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Grocery List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {groceries.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <input
                type="radio"
                checked={item.purchased}
                onChange={() => togglePurchased(item.id)}
                className="w-4 h-4"
              />
              <span className={item.purchased ? "line-through text-muted-foreground" : ""}>
                {item.name}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Selected Recipes Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Recipes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedRecipes.map((recipe) => (
            <div key={recipe.id} className="flex items-center space-x-3">
              <input type="radio" className="w-4 h-4" />
              <span>{recipe.name}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recipe Suggestions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Recipe Suggestions</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {recipeSuggestions.map((recipe) => (
            <div key={recipe.id} className="flex-shrink-0 w-24">
              <div className="w-20 h-20 bg-muted rounded-lg mb-2 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">{recipe.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plan;