import { Client } from 'pg';

const TEST_DB = 'wkt_postgraphile_test';
const TEST_TABLE = 'test_data';
const BASE_CONNECTION = { user: 'postgres', password: 'postgres', host: 'localhost' };//TODO read from env

// Create test database if missing
async function ensureTestDatabase() {
  const client = new Client({ ...BASE_CONNECTION, database: 'postgres' });
  try {
    await client.connect();
    const { rows } = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`, [TEST_DB]
    );
    if (rows.length === 0) {
      await client.query(`CREATE DATABASE ${TEST_DB}`);
    }
  } finally {
    await client.end();
  }
}

// Create table with PostGIS columns
async function createTestTable() {
  const client = new Client({ ...BASE_CONNECTION, database: TEST_DB });
  try {
    await client.connect();
    await client.query('CREATE EXTENSION IF NOT EXISTS postgis');
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${TEST_TABLE} (
        id SERIAL PRIMARY KEY,
        geom_point GEOMETRY(Point, 4326),
        geom_line GEOMETRY(LineString, 4326),
        geom_polygon GEOMETRY(Polygon, 4326),
        geom_polygon_with_holes GEOMETRY(Polygon, 4326),
        geom_multipoint GEOMETRY(MultiPoint, 4326),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
  } finally {
    await client.end();
  }
}

// Safe cleanup
async function dropTestTable() {
  const client = new Client({ ...BASE_CONNECTION, database: TEST_DB });
  try {
    await client.connect();
    await client.query(`DROP TABLE IF EXISTS ${TEST_TABLE} CASCADE`);
  } finally {
    await client.end();
  }
}

beforeAll(async () => {
  await ensureTestDatabase();
  await createTestTable();
}, 10000); // Extend timeout for DB operations

afterAll(async () => {
  await dropTestTable();
});

// Example test with data insertion
it('should handle WKT geometries', async () => {
  const client = new Client({ ...BASE_CONNECTION, database: TEST_DB });
  await client.connect();
  
  try {
    // Insert test data
    await client.query(`
      INSERT INTO ${TEST_TABLE} (geom_point, geom_polygon)
      VALUES (
        ST_GeomFromText('POINT(-71.064544 42.28787)', 4326),
        ST_GeomFromText('POLYGON((0 0, 4 0, 4 4, 0 4, 0 0), (1 1, 2 1, 2 2, 1 2, 1 1))', 4326)
      )
    `);

    // Your library API test here
  } finally {
    await client.end();
  }
});