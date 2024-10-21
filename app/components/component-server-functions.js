"use server"
import { dbFetch } from '../../utils/postgres.js'

export async function getRecipes() {
    try {
        const recipes = await dbFetch("SELECT * FROM all_recipes");
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}