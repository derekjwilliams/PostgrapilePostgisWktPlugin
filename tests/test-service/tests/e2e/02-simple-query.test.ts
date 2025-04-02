// tests/e2e/02-simple-query.test.ts
import { describe, it, expect } from 'vitest';
import { Query } from '../../src/generated/graphql'; // Import the Query type

const TEST_SERVER_URL = 'http://localhost:5050';
const GRAPHQL_ENDPOINT = `${TEST_SERVER_URL}/graphql`;

describe('PostGraphile PostGIS WKT Plugin - E2E Tests', () => {
  it('should retrieve test data with proper typing', async () => {
    const query = `
      query GetTestData {
        allTestData {
          edges {
            node {
              id
              geomPoint
              geogPoint
              geomLine
              geogLine
            }
          }
          nodes {
            geomPolygon
            geogPolygon
          }
          totalCount
        }
      }
    `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    // Type the response using the generated Query type
    const { data, errors } = await response.json() as { 
      data: Query;
      errors?: Array<{ message: string }>;
    };

    // Type-safe assertions
    expect(errors).toBeUndefined();
    expect(data.allTestData?.totalCount).toBeGreaterThanOrEqual(0);

    // Access typed data
    const firstEdgeNode = data.allTestData?.edges?.[0]?.node;

    console.log("firstEdgeNode:::",firstEdgeNode?.geomPoint)

    if (firstEdgeNode) {
      // You now get full autocompletion on firstEdgeNode
      expect(firstEdgeNode.geomPoint).toMatch(/^POINT\([-0-9. ]+\)/);
    }

    // For debugging with full typing
    console.log('Full response:', {
      totalCount: data.allTestData?.totalCount,
      firstEdge: data.allTestData?.edges?.[0]?.node,
      firstNode: data.allTestData?.nodes?.[0]
    });
  });
});
