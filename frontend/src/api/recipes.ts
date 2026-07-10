import { API_BASE_URL } from "./server-consts"

export async function getRecipes() {
    const response = await fetch(`${API_BASE_URL}/recipes/`);
    return response.json();
}