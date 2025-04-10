import mysql from "mysql2/promise";
import fs from "fs/promises";
import path from "path";

// Database connection configuration for local database
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "auth360db",
};

async function exportDatabase() {
  console.log("Starting database export...");

  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to database successfully");

    // Get all tables
    const [tables] = await connection.execute(
      `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `,
      [dbConfig.database]
    );

    const tableNames = tables.map((t) => t.TABLE_NAME || t.table_name);
    console.log(`Found ${tableNames.length} tables: ${tableNames.join(", ")}`);

    // Create export directory if it doesn't exist
    const exportDir = path.join(process.cwd(), "db-export");
    await fs.mkdir(exportDir, { recursive: true });

    // Export schema
    console.log("Exporting schema...");
    const schemaFile = path.join(exportDir, "schema.sql");
    let schemaContent = "";

    for (const tableName of tableNames) {
      // Get create table statement
      const [createTable] = await connection.execute(
        `SHOW CREATE TABLE ${tableName}`
      );
      const createStatement =
        createTable[0]["Create Table"] || createTable[0]["CREATE TABLE"];
      schemaContent += `DROP TABLE IF EXISTS \`${tableName}\`;\n${createStatement};\n\n`;

      // Export data
      console.log(`Exporting data from ${tableName}...`);
      const [rows] = await connection.execute(`SELECT * FROM ${tableName}`);

      if (rows.length > 0) {
        const dataFile = path.join(exportDir, `${tableName}.json`);
        await fs.writeFile(dataFile, JSON.stringify(rows, null, 2));
        console.log(`Exported ${rows.length} rows from ${tableName}`);
      } else {
        console.log(`Table ${tableName} is empty, skipping data export`);
      }
    }

    await fs.writeFile(schemaFile, schemaContent);
    console.log(`Schema exported to ${schemaFile}`);

    // Create import script
    const importScript = `
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';

// Configure this with your production database credentials
const dbConfig = {
  host: "YOUR_PRODUCTION_DB_HOST",
  user: "YOUR_PRODUCTION_DB_USER",
  password: "YOUR_PRODUCTION_DB_PASSWORD",
  database: "YOUR_PRODUCTION_DB_NAME",
};

async function importDatabase() {
  console.log('Starting database import...');
  
  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully');
    
    // Import schema
    console.log('Importing schema...');
    const schemaContent = await fs.readFile(path.join(process.cwd(), 'db-export', 'schema.sql'), 'utf8');
    const statements = schemaContent.split(';\\n\\n').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }
    
    // Get all data files
    const exportDir = path.join(process.cwd(), 'db-export');
    const files = await fs.readdir(exportDir);
    const dataFiles = files.filter(f => f.endsWith('.json'));
    
    for (const file of dataFiles) {
      const tableName = path.basename(file, '.json');
      console.log(\`Importing data into \${tableName}...\`);
      
      const data = JSON.parse(await fs.readFile(path.join(exportDir, file), 'utf8'));
      
      if (data.length > 0) {
        // Get columns
        const columns = Object.keys(data[0]);
        
        // Insert data in batches
        const batchSize = 100;
        for (let i = 0; i < data.length; i += batchSize) {
          const batch = data.slice(i, i + batchSize);
          
          if (batch.length > 0) {
            const placeholders = batch.map(() => \`(\${columns.map(() => '?').join(', ')})\`).join(', ');
            const values = batch.flatMap(row => columns.map(col => row[col]));
            
            const query = \`INSERT INTO \${tableName} (\${columns.map(c => \`\\\`\${c}\\\`\`).join(', ')}) VALUES \${placeholders}\`;
            await connection.execute(query, values);
          }
        }
        
        console.log(\`Imported \${data.length} rows into \${tableName}\`);
      }
    }
    
    console.log('Database import completed successfully');
    await connection.end();
  } catch (error) {
    console.error('Error importing database:', error);
  }
}

importDatabase();
    `;

    await fs.writeFile(
      path.join(exportDir, "import-database.js"),
      importScript
    );
    console.log("Import script created");

    console.log("Database export completed successfully");
    await connection.end();
  } catch (error) {
    console.error("Error exporting database:", error);
  }
}

exportDatabase();
