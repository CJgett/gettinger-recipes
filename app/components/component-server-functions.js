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

export async function searchDB(searchTerm) {
    const results = await dbFetch(
        `SELECT * FROM all_recipes WHERE name_en ILIKE $1 
            OR author ILIKE $1
            OR ingredients::text ILIKE $1
        `,
        [`%${searchTerm}%`]
    );
    return results;
}