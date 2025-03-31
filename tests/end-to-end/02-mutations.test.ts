// tests/e2e/02-mutations.test.ts
import { GraphQLClient } from '../utils/graphql-client';
import { GeometryVerifier } from '../test-service/src/db-client';
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';

const GRAPHQL_ENDPOINT = 'http://localhost:54321/graphql';
const TEST_DB_URL = process.env.TEST_DB_URL || 'postgres://postgres:postgres@localhost/wkt_postgraphile_test';

describe('Mutation Tests', () => {
  let gqlClient: GraphQLClient;
  let verifier: GeometryVerifier;

  beforeAll(async () => {
    gqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);
    verifier = new GeometryVerifier(TEST_DB_URL);
    await verifier.connect();
  });

  afterAll(async () => {
    await verifier.disconnect();
  });

  it('should create a point geometry', async () => {
    const mutation = `
      mutation CreatePoint($wkt: String!) {
        createGeometry(wkt: $wkt) {
          id
        }
      }
    `;

    // Execute mutation
    const result = await gqlClient.mutate<{ createGeometry: { id: number } }>(
      mutation,
      { wkt: 'POINT(-71.064544 42.28787)' }
    );

    // Verify database state
    const isValid = await verifier.verifyGeometry(
      result.createGeometry.id,
      'geomPoint', // or geom_point?
      'POINT(-71.064544 42.28787)'
    );
    
    expect(isValid).toBe(true);
  });
});