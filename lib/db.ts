import mysql from "mysql2/promise";

// Connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "auth360db",
  // Add these options for production database
  ssl:
    process.env.DB_SSL === "true"
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
  connectionLimit: 10, // Adjust based on your needs
  waitForConnections: true,
  queueLimit: 0,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Add a ping function to test the connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful");
    connection.release();
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}

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
