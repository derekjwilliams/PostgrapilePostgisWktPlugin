// test-service/tests/test-utils/create.ts
import { TestDatumInput } from '../../src/generated/graphql';

const GRAPHQL_ENDPOINT = 'http://localhost:5050/graphql';

type CreateTestDatumOptions = Partial<TestDatumInput>;

export async function createTestDatum(
  input: CreateTestDatumOptions
): Promise<{ id: string } & CreateTestDatumOptions> {
  const mutation = `
    mutation CreateTestDatum($input: CreateTestDatumInput!) {
      createTestDatum(input: $input) {
        testDatum {
          id
          geomPoint
          geogPoint
          geomLine
          geogLine
          geomPolygon
          geogPolygon
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: mutation,
      variables: { input: { testDatum: input } }
    }),
  });

  const { data, errors } = await response.json();
  if (errors || !data?.createTestDatum?.testDatum) {
    throw new Error(errors?.[0]?.message || 'Failed to create test datum');
  }

  return data.createTestDatum.testDatum;
}
