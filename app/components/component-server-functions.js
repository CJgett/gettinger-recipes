"use server"
import { dbFetch } from '../../utils/postgres.js'
import Anthropic from '@anthropic-ai/sdk';
import DOMPurify from 'isomorphic-dompurify';

export async function getRecipes() {
    try {
        const recipes = await dbFetch("SELECT id, name_en, pic, pic_alt FROM all_recipes");
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

export async function getLatestRecipes(numberOfRecipes = 3) {
    const recipes = await dbFetch(`SELECT id, name_en, pic, pic_alt FROM all_recipes ORDER BY id DESC LIMIT ${numberOfRecipes}`);
    return recipes;
}

export async function getAdminByUsername(username) {
    const admin = await dbFetch(`SELECT * FROM admins WHERE username = $1`, [username]);
    return admin[0];
}

export async function queryAI(message, conversationHistory = []) {
    const anthropic = new Anthropic({
        apiKey: process.env.CLAUDE_API_KEY,
    });
    try {
        let msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            messages: [...conversationHistory, { role: "user", content: message }],
        });
        msg = DOMPurify.sanitize(msg.content[0].text);
        return msg;
    } catch (error) {
        console.error('Error:', error);
        return "Sorry, I encountered an error processing your request.";
    }
}