import mysql from "mysql2/promise";

// Connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "auth360db",
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

export async function executeQuery<T>({
  query,
  values,
}: {
  query: string;
  values?: any[];
}): Promise<T> {
  try {
    const [results] = await pool.execute(query, values);
    return results as T;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Database query failed");
  }
}

export default pool;
