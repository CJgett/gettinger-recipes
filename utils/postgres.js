import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: "5432",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: true 
});

export async function dbFetch(customQueryText, values) {

  try {
    const client = await pool.connect();
    const result = await client.query(customQueryText, values);
    client.release();
    return result.rows;
  } catch (err) {
    console.error("Error fetching data: ", err);
    throw err;
  }
  
}


