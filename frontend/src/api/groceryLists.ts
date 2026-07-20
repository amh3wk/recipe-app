import { API_BASE_URL } from "./server-consts"

export type CreateGroceryListItemPayload = {
  ingredient_name: string;
  quantity: number;
  unit: string;
  grocery_list: number;
};

export type ApiGroceryListItem = {
  id: number;
  ingredient: number;
  ingredient_name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  grocery_list: number;
};

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

export async function getGroceryListRecipes(groceryListId: number) {
  const response = await fetch(
    `${API_BASE_URL}/grocery-list-recipes/?grocery_list=${groceryListId}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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

export async function deleteGroceryListRecipe(
  groceryListId: number,
  recipeId: number
) : Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/grocery-lists/${groceryListId}/remove-recipe/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe_id: recipeId }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to delete grocery-list item: ${response.status} ${errorBody}`
    );
  }
}

export async function toggleGroceryListItem(itemId: number, checked: boolean) {
  const response = await fetch(`${API_BASE_URL}/grocery-list-items/${itemId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ checked }),
  });

  return response.json();
}

export async function createGroceryListItem(
  data: CreateGroceryListItemPayload
) : Promise<ApiGroceryListItem> {
  const response = await fetch(
    `${API_BASE_URL}/grocery-list-items/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to create grocery-list item: ${response.status} ${errorBody}`
    );
  }

  return response.json();
}

export async function deleteGroceryListItem(
  itemId: number
) : Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/grocery-list-items/${itemId}/`, 
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to delete grocery-list item: ${response.status} ${errorBody}`
    );
  }
}