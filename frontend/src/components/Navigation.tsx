import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, BookOpen, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/grocery-list", icon: ShoppingCart, label: "Grocery List" },
    { path: "/recipes", icon: BookOpen, label: "Recipes" },
    { path: "/plan", icon: Calendar, label: "Plan" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-4 text-muted-foreground",
                    isActive && "text-foreground"
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
        })}
      </div>
    </nav>
  );
};

export default Navigation;