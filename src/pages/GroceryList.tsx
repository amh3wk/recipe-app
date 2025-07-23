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
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold flex items-center">
            <ShoppingCart className="mr-3 h-8 w-8 text-primary" />
            Grocery List
          </h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            This Week
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>{totalItems} total items</span>
          <span>{completedCount} completed</span>
          <span>{totalItems - completedCount} remaining</span>
        </div>
        
        {totalItems > 0 && (
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalItems) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Add New Item */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              className="flex-1"
            />
            <Input
              placeholder="Quantity (optional)"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              className="md:w-32"
            />
            <Button onClick={addItem} className="md:w-auto w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Items */}
      {pendingItems.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Shopping List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <Checkbox
                  checked={item.purchased}
                  onCheckedChange={() => togglePurchased(item.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.name}</span>
                    {item.quantity && (
                      <Badge variant="secondary" className="text-xs">
                        {item.quantity}
                      </Badge>
                    )}
                    {item.fromRecipe && (
                      <Badge variant="outline" className="text-xs">
                        From: {item.fromRecipe}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Completed Items */}
      {completedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completed ({completedItems.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/50 opacity-75">
                <Checkbox
                  checked={item.purchased}
                  onCheckedChange={() => togglePurchased(item.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium line-through">{item.name}</span>
                    {item.quantity && (
                      <Badge variant="secondary" className="text-xs">
                        {item.quantity}
                      </Badge>
                    )}
                    {item.fromRecipe && (
                      <Badge variant="outline" className="text-xs">
                        From: {item.fromRecipe}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

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