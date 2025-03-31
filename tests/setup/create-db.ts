import { Client } from 'pg';

export async function createTestSchema(connectionString: string) {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    // Create PostGIS extension
    await client.query('CREATE EXTENSION IF NOT EXISTS postgis');
    
    // Create test table from SQL file
    const ddl = await fs.readFile('./tests/setup/schema/test-table.sql', 'utf8');
    await client.query(ddl);
  } finally {
    await client.end();
  }
}