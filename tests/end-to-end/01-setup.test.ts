import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { LocalDatabase } from "../utils/local-db";
import { sql } from "drizzle-orm";

describe('Database Setup', () => {
  const connectionString = process.env.TEST_DB_URL || 'postgres://postgres:postgres@localhost:5432/wkt_postgraphile_test';
  let db: LocalDatabase;

  beforeAll(async () => {
    db = new LocalDatabase(connectionString);
    await db.connect();
    await db.runMigrations(); // Restored migration call
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('should have created test_data table', async () => {
    const res = await db.drizzle.execute(
      sql`SELECT EXISTS (SELECT FROM information_schema.tables 
          WHERE table_name = 'test_data')`
    );
    expect(res.rows[0].exists).toBe(true);
  });
});