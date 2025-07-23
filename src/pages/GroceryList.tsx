import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ShoppingCart, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GroceryItem {
  id: number;
  name: string;
  quantity: string;
  purchased: boolean;
  fromRecipe?: string;
}

const GroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>([
    { id: 1, name: "Tomatoes", quantity: "2 lbs", purchased: false, fromRecipe: "Mediterranean Pasta Salad" },
    { id: 2, name: "Olive Oil", quantity: "1 bottle", purchased: true },
    { id: 3, name: "Feta Cheese", quantity: "200g", purchased: false, fromRecipe: "Mediterranean Pasta Salad" },
    { id: 4, name: "Bread", quantity: "1 loaf", purchased: false },
  ]);
  
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const { toast } = useToast();

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: GroceryItem = {
        id: Date.now(),
        name: newItemName.trim(),
        quantity: newItemQuantity.trim() || "1",
        purchased: false,
      };
      setItems([...items, newItem]);
      setNewItemName("");
      setNewItemQuantity("");
      
      toast({
        title: "Item added",
        description: `${newItem.name} has been added to your grocery list.`,
      });
    }
  };

  const togglePurchased = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your grocery list.",
    });
  };

  const completedItems = items.filter(item => item.purchased);
  const pendingItems = items.filter(item => !item.purchased);
  const totalItems = items.length;
  const completedCount = completedItems.length;

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">Grocery List</h1>
      <h2 className="text-lg font-medium text-muted-foreground mb-6">Weekly</h2>

      {/* Grocery Items */}
      <div className="space-y-4 mb-20">
        {items.map((item) => (
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
      </div>

      {/* Add Ingredient Button */}
      <div className="fixed bottom-20 left-4 right-4">
        <Button 
          onClick={addItem} 
          className="w-full h-12 text-lg"
          size="lg"
        >
          Add Ingredient
        </Button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">Your grocery list is empty</p>
          <p className="text-sm text-muted-foreground mb-6">
            Add items manually or select recipes to automatically populate your list
          </p>
        </div>
      )}
    </div>
  );
};

export default GroceryList;