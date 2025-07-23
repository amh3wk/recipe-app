import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, BookOpen, PlusCircle, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/recipes", icon: BookOpen, label: "Recipes" },
    { path: "/grocery-list", icon: ShoppingCart, label: "Grocery List" },
    { path: "/add-recipe", icon: PlusCircle, label: "Add Recipe" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:top-0 md:bottom-auto md:bg-background/95 md:backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-2 md:py-4 md:justify-start md:space-x-8">
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-primary">FreshPlanner</h1>
          </div>
          
          <div className="flex justify-around w-full md:w-auto md:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "flex flex-col md:flex-row gap-1 h-auto py-2 px-3",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <Link to={item.path}>
                    <Icon className="h-4 w-4" />
                    <span className="text-xs md:text-sm">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;