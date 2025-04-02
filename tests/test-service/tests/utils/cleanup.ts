// test-service/tests/test-utils/cleanup.ts
import { TestDatum } from '../../src/generated/graphql';

const GRAPHQL_ENDPOINT = 'http://localhost:5050/graphql';

/**
 * Deletes all test data created during tests
 */
export async function cleanupTestData(ids: string[]): Promise<void> {
  await Promise.all(ids.map(deleteTestDatumById));
}

/**
 * Deletes a single test datum by ID
 */
export async function deleteTestDatumById(id: string): Promise<void> {
  const mutation = `
    mutation DeleteTestDatum($id: ID!) {
      deleteTestDatum(input: { id: $id }) {
        deletedTestDatumId
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: mutation,
      variables: { id }
    }),
  });

  if (!response.ok) {
    console.error(`Failed to delete test datum ${id}`);
  }
}

/**
 * Deletes all test data matching optional conditions
 */
export async function deleteAllTestData(condition?: Partial<TestDatum>): Promise<number> {
  const query = `
    query GetTestDataToDelete($condition: TestDatumCondition) {
      allTestData(condition: $condition) {
        nodes {
          id
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: {
        condition: condition ? mapToCondition(condition) : undefined
      }
    }),
  });

  const { data } = await response.json();
  const ids = data?.allTestData?.nodes?.map((node: { id: string }) => node.id) || [];
  
  await cleanupTestData(ids);
  return ids.length;
}

// Helper to convert partial TestDatum to GraphQL condition
function mapToCondition(data: Partial<TestDatum>): any {
  return {
    ...(data.id && { id: data.id }),
    ...(data.rowId && { rowId: data.rowId })
  };
}
