import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useRecipes, useGroceries } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Breakfast", "Lunch", "Dinner"] as const;
type Meal = (typeof MEALS)[number];
type Plan = Record<string, Partial<Record<Meal, number>>>;

const STORAGE_KEY = "weekly-plan";

const loadPlan = (): Plan => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const PlanPage = () => {
  const { recipes } = useRecipes();
  const { addItem } = useGroceries();
  const { toast } = useToast();
  const [plan, setPlan] = useState<Plan>(loadPlan);
  const [editing, setEditing] = useState<{ day: string; meal: Meal } | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");

  const savePlan = (next: Plan) => {
    setPlan(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const assign = () => {
    if (!editing || !selectedRecipeId) return;
    const recipeId = Number(selectedRecipeId);
    const next = {
      ...plan,
      [editing.day]: { ...plan[editing.day], [editing.meal]: recipeId },
    };
    savePlan(next);

    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      recipe.ingredients.forEach((ing) => addItem(ing, recipe.title));
      toast({ title: "Meal planned", description: `${recipe.title} added to ${editing.day} ${editing.meal}.` });
    }
    setEditing(null);
    setSelectedRecipeId("");
  };

  const clearMeal = (day: string, meal: Meal) => {
    const dayPlan = { ...plan[day] };
    delete dayPlan[meal];
    savePlan({ ...plan, [day]: dayPlan });
  };

  const recipeName = (id?: number) => recipes.find((r) => r.id === id)?.title;

  return (
    <div className="container mx-auto px-4 py-6 pb-24 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">Plan</h1>
      <h2 className="text-lg font-medium text-muted-foreground mb-6">Weekly Schedule</h2>

      <div className="space-y-3">
        {DAYS.map((day) => (
          <Card key={day} className="p-4">
            <h3 className="font-semibold mb-3">{day}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {MEALS.map((meal) => {
                const id = plan[day]?.[meal];
                const name = recipeName(id);
                return (
                  <div
                    key={meal}
                    className="border border-border rounded-md p-3 min-h-[70px] flex flex-col"
                  >
                    <span className="text-xs uppercase text-muted-foreground mb-1">{meal}</span>
                    {name ? (
                      <div className="flex items-start justify-between gap-2 flex-1">
                        <span className="text-sm font-medium">{name}</span>
                        <button
                          onClick={() => clearMeal(day, meal)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-auto justify-start text-muted-foreground h-auto py-1 px-1"
                        onClick={() => {
                          setEditing({ day, meal });
                          setSelectedRecipeId("");
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add recipe
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? `${editing.day} · ${editing.meal}` : ""}
            </DialogTitle>
          </DialogHeader>
          {recipes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No recipes yet. Add some from the Recipes tab first.
            </p>
          ) : (
            <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a recipe" />
              </SelectTrigger>
              <SelectContent>
                {recipes.map((r) => (
                  <SelectItem key={r.id} value={String(r.id)}>
                    {r.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={assign} disabled={!selectedRecipeId}>
              Add to plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanPage;
