import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, X, Sun, Moon, ChevronRight, GripVertical } from "lucide-react";
import { useRecipes, useGroceries } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Breakfast", "Lunch", "Dinner"] as const;
type Meal = (typeof MEALS)[number];
type Plan = Record<string, Partial<Record<Meal, number>>>;

const STORAGE_KEY = "weekly-plan";

// Dates for the current week, starting Monday
const weekDates = (() => {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
})();
const todayIndex = (new Date().getDay() + 6) % 7;

const mealStyles: Record<Meal, { icon: typeof Sun; tint: string; fg: string }> = {
  Breakfast: { icon: Sun, tint: "bg-meal-morning", fg: "text-meal-morning-foreground" },
  Lunch: { icon: Sun, tint: "bg-meal-midday", fg: "text-meal-midday-foreground" },
  Dinner: { icon: Moon, tint: "bg-meal-evening", fg: "text-meal-evening-foreground" },
};

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
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [name, setName] = useState(false);
  const [editing, setEditing] = useState<{ day: string; meal: Meal } | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");

  const savePlan = (next: Plan) => {
    setPlan(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleSaveItem = () => {
    setIsAddingItem(false);
    setNewItemName("");
  }

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

  const handleShowItemInput = () => {
    setIsAddingItem(true);
    setNewItemName("");
  };

  const recipeName = (id?: number) => recipes.find((r) => r.id === id)?.title;

  return (
    <div className="mx-auto flex h-dvh w-full flex-col overflow-hidden px-3 max-w-3xl pt-[calc(env(safe-area-inset-top)+1rem)]">
      <h1 className="text-xl font-bold mb-1">Plan</h1>
      <h2 className="text-sm font-medium text-muted-foreground mb-3">Weekly Schedule</h2>

      <div className="flex-1 min-h-0 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
        <div className="flex flex-col gap-3">
          {DAYS.map((day, i) => {
            const isToday = i === todayIndex;
            return (
              <Card
                key={day}
                className={`flex overflow-hidden rounded-2xl border-0 shadow-sm ${
                  isToday ? "bg-primary/30" : "bg-card"
                }`}
              >
                <div className="flex items-center gap-1 pl-2 pr-3 py-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground/40" />
                  <div className="w-12 text-center">
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-widest ${
                        isToday ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </div>
                    <div className="text-2xl font-semibold text-foreground">
                      {weekDates[i].getDate()}
                    </div>
                  </div>
                </div>

                <div className="flex-1 border-l border-border/70 divide-y divide-border/50">
                  {MEALS.map((meal) => {
                    const id = plan[day]?.[meal];
                    // const name = recipeName(id);
                    const { icon: Icon, tint, fg } = mealStyles[meal];
                    return (
                      <div key={meal} className="flex items-center gap-3 px-3 py-2">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                          <Icon className={`h-4 w-4 ${fg}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] text-muted-foreground leading-tight">{meal}</div>
                          {name &&
                            <div className="truncate text-sm font-medium leading-tight">{name}</div>
                          }
                          {isAddingItem && 
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                disabled
                                className="w-4 h-4"
                              />

                              <Input
                                value={newItemName}
                                onChange={(event) => setNewItemName(event.target.value)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter") {
                                    handleSaveItem();
                                  }

                                  if (event.key === "Escape") {
                                    setNewItemName("");
                                    setIsAddingItem(false);
                                  }
                                }}
                                onBlur={handleSaveItem}
                                placeholder="Ingredient name"
                                className="h-8 flex-1"
                                autoFocus
                              />
                            </div>
                          }
                          {!isAddingItem &&  (
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 rounded-md border-dashed"
                                aria-label="Add item"
                                onClick={handleShowItemInput}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            )}
                        </div>
                        {name ? (
                          <button
                            onClick={() => clearMeal(day, meal)}
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                            aria-label={`Clear ${meal} for ${day}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        ) : null}
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
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
