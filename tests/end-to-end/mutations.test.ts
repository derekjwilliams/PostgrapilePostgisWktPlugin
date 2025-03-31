// tests/e2e/mutations.test.ts
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { GeometryVerifier } from '../test-service/src/db-client';

describe('Geometry Tests', () => {
  const connStr = 'postgres://postgres:postgres@localhost/wkt_postgraphile_test';
  let verifier: GeometryVerifier;

  beforeAll(async () => {
    verifier = new GeometryVerifier(connStr);
    await verifier.connect();
  });

  afterAll(async () => {
    await verifier.disconnect();
  });

  it('should verify point geometry', async () => {
    const isValid = await verifier.verifyGeometryEwkt(
      1,
      'geom_point',
      'SRID=4326;POINT(-71.064544 42.28787)'
    );
    expect(isValid).toBe(true);
  });

  it('should verify polygon area', async () => {
    const result = await verifier.client.query<{ area: number }>({
      text: `SELECT ST_Area(geom_polygon) as area FROM test_data WHERE id = $1`,
      values: [1]
    });
    expect(result.rows[0]?.area).toBeCloseTo(16, 2);
  });
});