import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ShoppingCart, PlusCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-grocery.jpg";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img 
          src={heroImage} 
          alt="Fresh groceries and meal planning" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
          <div className="text-white p-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome to FreshPlanner
            </h1>
            <p className="text-lg opacity-90 mb-4">
              Plan your meals, organize your shopping, and eat better every week
            </p>
            <Button asChild className="bg-primary hover:bg-primary-hover">
              <Link to="/recipes">
                <BookOpen className="mr-2 h-4 w-4" />
                Explore Recipes
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">My Recipes</CardTitle>
            </div>
            <CardDescription>
              Browse and manage your favorite recipes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/recipes">View Recipes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-secondary" />
              </div>
              <CardTitle className="text-lg">Grocery List</CardTitle>
            </div>
            <CardDescription>
              Manage your weekly shopping list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/grocery-list">View List</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/30 rounded-lg">
                <PlusCircle className="h-5 w-5 text-accent-foreground" />
              </div>
              <CardTitle className="text-lg">Add Recipe</CardTitle>
            </div>
            <CardDescription>
              Create a new recipe for your collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/add-recipe">Add Recipe</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recipe Suggestions */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>Smart Suggestions</CardTitle>
          </div>
          <CardDescription>
            Recipes that match ingredients in your current grocery list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Add items to your grocery list to see smart recipe suggestions!</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/grocery-list">Start Shopping List</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;