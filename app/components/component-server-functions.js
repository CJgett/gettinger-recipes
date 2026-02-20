"use server"
import { dbFetch } from '../../utils/postgres.js'
import Anthropic from '@anthropic-ai/sdk';

export async function getRecipes() {
    try {
        const recipes = await dbFetch("SELECT id, name_en FROM all_recipes");
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}

// Add a new function to fetch complete recipe details
export async function getRecipeDetails(recipeId) {
    try {
        const recipe = await dbFetch(
            "SELECT * FROM all_recipes WHERE id = $1",
            [recipeId]
        );
        return recipe[0];
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null;
    }
}

export async function getRecipesLazyLoad(page = 1, limit = 4) {
    try {
        const offset = (page - 1) * limit;
        const recipes = await dbFetch(
            `SELECT id, name_en, pic, pic_alt, tags, is_family_recipe 
             FROM all_recipes 
             ORDER BY id 
             LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        
        // Get total count to determine if there are more recipes
        const [{ total_count }] = await dbFetch(
            'SELECT COUNT(*) as total_count FROM all_recipes'
        );
        
        return {
            data: recipes,
            hasMore: offset + recipes.length < parseInt(total_count)
        };
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return { data: [], hasMore: false };
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

export async function getLatestRecipes(numberOfRecipes = 3) {
    const recipes = await dbFetch(`SELECT id, name_en, pic, pic_alt FROM all_recipes ORDER BY id DESC LIMIT ${numberOfRecipes}`);
    return recipes;
}

export async function getAdminByUsername(username) {
    const admin = await dbFetch(`SELECT * FROM admins WHERE username = $1`, [username]);
    return admin[0];
}

export async function queryAI(message, conversationHistory = []) {
    console.log("queryAI called");
    console.log("message: " + message);
    console.log("conversationHistory: " + conversationHistory);
    const anthropic = new Anthropic({
        apiKey: process.env.CLAUDE_API_KEY,
    });
    try {
        const stream = await anthropic.messages.create({
            model: "claude-sonnet-4-5-20250929",
            max_tokens: 1024,
            messages: [...conversationHistory, { role: "user", content: message }],
            stream: true,
        });
        return stream;
    } catch (error) {
        console.error('Error:', error);
        return "Sorry, I encountered an error processing your request.";
    }
}
