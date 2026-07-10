import { API_BASE_URL } from "./server-consts"

export async function createGroceryList(name: string) {
  const response = await fetch(`${API_BASE_URL}/grocery-lists/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return response.json();
}

export async function getGroceryLists() {
  const response = await fetch(`${API_BASE_URL}/grocery-list-items/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function addRecipeToGroceryList(
  groceryListId: number,
  recipeId: number
) {
  const response = await fetch(
    `${API_BASE_URL}/grocery-lists/${groceryListId}/add-recipe/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe_id: recipeId }),
    }
  );

  return response.json();
}