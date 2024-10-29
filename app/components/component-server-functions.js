"use server"
import { dbFetch } from '../../utils/postgres.js'
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import Anthropic from '@anthropic-ai/sdk';
import DOMPurify from 'dompurify';

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

export async function getAdminByUsername(username) {
    const admin = await dbFetch(`SELECT * FROM admins WHERE username = $1`, [username]);
    return admin[0];
}

export async function verifyToken(token) {
    const verifiedTokenResult = verify(token, process.env.JWT_SECRET);
    return verifiedTokenResult;
}

export async function handleLogin(username, password) {
    try {
        const admin = await getAdminByUsername(username);
        if (!admin) {
            return { success: false, message: 'Username not found' };
        }

        const isPasswordValid = await compare(password, admin.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid password' };
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { success: true, token };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
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
        try {
            msg = DOMPurify.sanitize(msg);
        } catch (error) {
            console.error('Error sanitizing message:', error);
        }
        console.log(msg);
        return msg.content[0].text;
    } catch (error) {
        console.error('Error:', error);
        return "Sorry, I encountered an error processing your request.";
    }
}