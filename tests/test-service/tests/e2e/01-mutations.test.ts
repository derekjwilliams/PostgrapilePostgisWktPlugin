// test-service/tests/e2e/mutations.test.ts
import { describe, it, expect, afterAll } from 'vitest';
import { cleanupTestData } from '../utils/cleanup';
import { createTestDatum } from '../utils/create';
import { randomPoint } from '../utils/geometry-generators';

describe('PostGIS WKT Plugin - Mutation Tests', () => {
  const createdIds: string[] = [];

  afterAll(async () => {
    await cleanupTestData(createdIds);
  });

  it('should correctly create point data', async () => {
    const input = {
      geomPoint: randomPoint(),
      geogPoint: randomPoint()
    };

    const result = await createTestDatum(input);
    if (result) {
      createdIds.push(result.id);

      // Verify response
      expect(result.id).toBeDefined();
      expect(result.geomPoint).toBe(input.geomPoint);
      expect(result.geogPoint).toBe(input.geogPoint);

      // Verify the response contains ONLY the requested fields
      expect(Object.keys(result).sort()).toEqual(
        ['id', 'geomPoint', 'geogPoint'].sort()
      );
    }
  });
});
