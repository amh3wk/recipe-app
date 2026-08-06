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
    <div className="mx-auto flex h-dvh w-full flex-col overflow-hidden px-3 max-w-3xl pt-[calc(env(safe-area-inset-top)+1rem)]">
      <h1 className="text-xl font-bold mb-1">Plan</h1>
      <h2 className="text-sm font-medium text-muted-foreground mb-3">Weekly Schedule</h2>

      <div className="flex-1 min-h-0 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
        <div className="flex flex-col gap-2">
          {DAYS.map((day) => (
            <Card key={day} className="p-2">
              <h3 className="text-sm font-semibold leading-none mb-1.5">{day}</h3>
              <div className="grid grid-cols-3 gap-1.5">
                {MEALS.map((meal) => {
                  const id = plan[day]?.[meal];
                  const name = recipeName(id);
                  return (
                    <div
                      key={meal}
                      className="border border-border rounded-md p-1.5 min-h-[44px] flex flex-col"
                    >
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground leading-none mb-1">
                        {meal.slice(0, 3)}
                      </span>
                      {name ? (
                        <div className="flex items-start justify-between gap-1 flex-1">
                          <span className="text-xs font-medium leading-tight line-clamp-2">{name}</span>
                          <button
                            onClick={() => clearMeal(day, meal)}
                            className="text-muted-foreground hover:text-destructive shrink-0"
                            aria-label={`Clear ${meal} for ${day}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-auto justify-start text-muted-foreground h-auto py-0 px-0 min-w-0 w-full"
                          onClick={() => {
                            setEditing({ day, meal });
                            setSelectedRecipeId("");
                          }}
                          aria-label={`Add recipe to ${day} ${meal}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span className="text-[10px] ml-0.5">Add</span>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
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
