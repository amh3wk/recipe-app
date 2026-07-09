import { useEffect, useState } from "react";

export interface GroceryItem {
  id: number;
  name: string;
  purchased: boolean;
  fromRecipe?: string;
}

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  ingredients: string[];
  image?: string;
  category?: string;
}

const DEFAULT_GROCERIES: GroceryItem[] = [
  { id: 1, name: "Milk", purchased: false },
  { id: 2, name: "Eggs", purchased: false },
  { id: 3, name: "Bread", purchased: false },
];

const DEFAULT_RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Mediterranean Pasta Salad",
    description: "Fresh pasta with olives, tomatoes, and feta cheese",
    ingredients: ["pasta", "olives", "tomatoes", "feta cheese", "olive oil"],
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    description: "Healthy grilled chicken with mixed greens and vegetables",
    ingredients: ["chicken breast", "mixed greens", "tomatoes", "cucumber", "olive oil"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
  },
];

type Listener = () => void;
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  emit();
}

function useStore<T>(key: string, fallback: T): [T, (v: T) => void] {
  const [state, setState] = useState<T>(() => read(key, fallback));
  useEffect(() => {
    const l = () => setState(read(key, fallback));
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, [key]);
  const set = (v: T) => write(key, v);
  return [state, set];
}

export function useGroceries() {
  const [items, setItems] = useStore<GroceryItem[]>("groceries", DEFAULT_GROCERIES);

  const addItem = (name: string, fromRecipe?: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (items.some((i) => i.name.toLowerCase() === trimmed.toLowerCase())) return;
    setItems([...items, { id: Date.now() + Math.random(), name: trimmed, purchased: false, fromRecipe }]);
  };

  const toggle = (id: number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, purchased: !i.purchased } : i)));
  };

  const remove = (id: number) => setItems(items.filter((i) => i.id !== id));

  return { items, addItem, toggle, remove };
}

export function useRecipes() {
  const [recipes, setRecipes] = useStore<Recipe[]>("recipes", DEFAULT_RECIPES);
  const addRecipe = (r: Omit<Recipe, "id">) => {
    setRecipes([...recipes, { ...r, id: Date.now() }]);
  };
  return { recipes, addRecipe };
}
