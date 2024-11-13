import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: "5432",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

export async function dbFetch(customQueryText, values) {

  try {
    const client = await pool.connect();
    const result = await client.query(customQueryText, values);
    console.log("here's the data you requested: ", result.rows);
    client.release();
    return result.rows;
  } catch (err) {
    console.error("Error fetching data: ", err);
    throw err;
  }
  
}


