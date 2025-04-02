// tests/e2e/02-mutations.test.ts
import { GraphQLClient } from '../utils/graphql-client.js';
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
const GRAPHQL_ENDPOINT = 'http://localhost:54321/graphql';
const TEST_DB_URL = process.env.TEST_DB_URL || 'postgres://postgres:postgres@localhost/wkt_postgraphile_test';
describe.only('Mutation Tests', () => {
    let gqlClient;
    beforeAll(async () => {
        gqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);
    });
    afterAll(async () => {
    });
    it.only('should create a geometry record via GraphQL mutation', async () => {
        const mutation = `
    mutation CreateGeometry($geom: String!) {
      createTestDatum(input: {
        testDatum: {
          geomPoint: $geom
        }
      }) {
        testDatum {
          id
          geomPoint
        }
      }
    }
  `;
        // Execute mutation with parameterized input
        const result = await gqlClient.mutate(mutation, {
            rowId: 3, // TODO should let DB handle this
            geom: 'POINT(2.351400 48.857500)'
        });
        // Verify response structure
        expect(result.createTestDatum.testDatum.geomPoint).toBe('POINT(2.351400 48.857500)');
        // Verify database persistence
        // const isValid = await verifier.verifyGeometry(
        //   result.createTestDatum.testDatum.id,
        //   'geom_point',
        //   'POINT(2.351400 48.857500)'
        // );
        // expect(isValid).toBe(true);
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
        const result = await gqlClient.mutate(mutation, { wkt: 'POINT(-71.064544 42.28787)' });
        // Verify database state
        // const isValid = await verifier.verifyGeometry(
        //   result.createGeometry.id,
        //   'geomPoint', // or geom_point?
        //   'POINT(-71.064544 42.28787)'
        // );
        // expect(isValid).toBe(true);
    });
});
