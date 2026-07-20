import { API_BASE_URL } from "./server-consts"

export async function getRecipes() {
    const response = await fetch(`${API_BASE_URL}/recipes/`);
    return response.json();
}

export async function getRecipeIngredients(recipeId: number) {
    const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/ingredients/`);
    return response.json();
}