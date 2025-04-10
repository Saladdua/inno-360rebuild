import { testConnection } from "../lib/db.js";

async function main() {
  console.log("Testing database connection...");
  const isConnected = await testConnection();

  if (isConnected) {
    console.log("✅ Database connection successful!");
  } else {
    console.error("❌ Database connection failed!");
  }
}

main().catch(console.error);
