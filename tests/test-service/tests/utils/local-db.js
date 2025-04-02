// tests/utils/local-db.ts
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../test-service/src/schema';
export class LocalDatabase {
    client;
    drizzle;
    constructor(connectionString) {
        this.client = new Client({ connectionString });
        this.drizzle = drizzle(this.client, { schema });
    }
    async connect() {
        await this.client.connect();
    }
    async disconnect() {
        await this.client.end();
    }
    async runMigrations() {
        // Create PostGIS extension
        await this.client.query('CREATE EXTENSION IF NOT EXISTS postgis');
        // Create test_data table
        await this.client.query(`
      CREATE TABLE IF NOT EXISTS test_data (
        id SERIAL PRIMARY KEY,
        geom_point GEOMETRY(Point, 4326),
        geom_line GEOMETRY(LineString, 4326),
        geom_polygon GEOMETRY(Polygon, 4326),
        geom_polygon_with_holes GEOMETRY(Polygon, 4326),
        geom_multipoint GEOMETRY(MultiPoint, 4326),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    }
}
