// test-service/tests/e2e/01-mutations.test.ts
import { describe, it, expect, afterAll } from 'vitest';
import { cleanupTestData } from '../utils/cleanup';
import { createTestDatum } from '../utils/create';
describe('PostGIS WKT Plugin - Data Population', () => {
  const createdIds: string[] = [];

  afterAll(async () => {
    await cleanupTestData(createdIds);
  });

  it('should populate test data', async () => {
    const point = await createTestDatum({
      geomPoint: 'POINT(-123 40)',
      geogPoint: 'POINT(-122 37)'
    });
    createdIds.push(point.id);

    const line = await createTestDatum({
      geomLine: 'LINESTRING(-123 40, -124 41)'
    });
    createdIds.push(line.id);

    // ... more test data
  });
});
