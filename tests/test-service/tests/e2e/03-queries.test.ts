// verify queries work
import { LocalDatabase } from '../utils/local-db.js';
// import { GeometryVerifier } from '../test-service/src/db-client';
import { GraphQLClient } from '../utils/graphql-client.js';
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';

//const TEST_DB_URL = process.env.TEST_DB_URL || 'postgres://postgres:postgres@localhost:5432/wkt_postgraphile_test';
const TEST_DB_URL = 'postgres://postgres:postgres@localhost:5432/wkt_postgraphile_test'
const GRAPHQL_ENDPOINT = 'http://localhost:5050/graphql';

describe('Query Operations', () => {
  let db: LocalDatabase;
  let gqlClient: GraphQLClient;
  // let verifier: GeometryVerifier;

  beforeAll(async () => {
    // Initialize local database
    db = new LocalDatabase(TEST_DB_URL);
    await db.connect();
    await db.runMigrations();
    
    // Setup GraphQL client and verifier
    gqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);
    // verifier = new GeometryVerifier(TEST_DB_URL);
    
    // Insert test data
    await gqlClient.mutate(`
      mutation CreateTestData {
        point: createGeometry(wkt: "POINT(-71.064544 42.28787)") { id }
        polygon: createGeometry(wkt: "POLYGON((0 0, 4 0, 4 4, 0 4, 0 0))") { id }
      }
    `);
  }, 120_000);

  afterAll(async () => {
    await db.disconnect();
  });

  // it('should retrieve point geometry via GraphQL', async () => {
  //   const response = await gqlClient.query(`
  //     query GetPoint($id: ID!) {
  //       geometry(id: $id) {
  //         wkt
  //       }
  //     }
  //   `, { id: 'point' });

  //   expect(response.geometry.wkt).toBe('POINT (-71.064544 42.28787)');
    
    // Verify coordinate precision
    // const isValid = await verifier.verifyPrecision(
    //   'point',
    //   'POINT(-71.064544 42.28787)',
    //   6
    // );
    // expect(isValid).toBe(true);
  // });

  // it('should handle complex polygon queries', async () => {
  //   const response = await gqlClient.query(`
  //     query {
  //       geometries(filter: { type: POLYGON }) {
  //         wkt
  //       }
  //     }
  //   `);

  //   expect(response.geometries[0].wkt).toMatch(/POLYGON.*0 0.*4 4/);
    
  //   // Verify polygon area
  //   const area = await verifier.calculateArea('polygon');
  //   expect(area).toBeCloseTo(16, 1); // 16 square units
  // });

  // it('should return empty array for non-matching queries', async () => {
  //   const response = await gqlClient.query(`
  //     query {
  //       geometries(filter: { type: LINESTRING }) {
  //         wkt
  //       }
  //     }
  //   `);

  //   expect(response.geometries).toHaveLength(0);
  // });

  //TODO add for testing geometry collections
// it('should handle geometry collections', async () => {
//   // Test collection insertion and retrieval
//   const mutationResult = await gqlClient.mutate<{ createGeometry: { id: number } }>(`
//     mutation {
//       createGeometry(wkt: "GEOMETRYCOLLECTION(
//         POINT(1 2),
//         LINESTRING(0 0, 1 1
//       )") {
//         id
//       }
//     }
//   `);

//   // Verify database storage
//   const isValid = await verifier.verifyGeometry(
//     mutationResult.createGeometry.id,
//     'geom_collection', // Assuming you have this column
//     'GEOMETRYCOLLECTION (POINT (1 2), LINESTRING (0 0, 1 1))'
//   );
//   expect(isValid).toBe(true);

//   // Test querying
//   const response = await gqlClient.query<{ geometries: Array<{ wkt: string }> }>(`
//     query {
//       geometries(filter: { type: GEOMETRYCOLLECTION }) {
//         wkt
//       }
//     }
//   `);

//   // Proper assertions
//   expect(response.geometries[0].wkt).toMatch(
//     /GEOMETRYCOLLECTION\s*\(.*LINESTRING.*\)/i
//   );
//   expect(response.geometries[0].wkt).toContain('POINT(1 2)');
// });
});
