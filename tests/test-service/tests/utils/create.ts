// test-service/tests/test-utils/create.ts
import { TestDatum } from '../../src/generated/graphql';

const GRAPHQL_ENDPOINT = 'http://localhost:5050'

type CreateTestDatumOptions = {
  geomPoint?: string;
  geogPoint?: string;
  geomLine?: string;
  geogLine?: string;
  geomPolygon?: string;
  geogPolygon?: string;
  geomPolygonWithHoles?: string;
  geogPolygonWithHoles?: string;
  geomMultipoint?: string;
  geogMultipoint?: string;
};

export async function createTestDatum(
  input: CreateTestDatumOptions
): Promise<TestDatum | undefined> {
  // Dynamically build the fields selection
  const fields = ['id'];
  if (input.geomPoint) fields.push('geomPoint');
  if (input.geogPoint) fields.push('geogPoint');
  if (input.geomLine) fields.push('geomLine');
  if (input.geogLine) fields.push('geogLine');
  if (input.geomPolygon) fields.push('geomPolygon');
  if (input.geogPolygon) fields.push('geogPolygon');
  if (input.geomPolygonWithHoles) fields.push('geomPolygonWithHoles');
  if (input.geogPolygonWithHoles) fields.push('geogPolygonWithHoles');
  if (input.geomMultipoint) fields.push('geomMultipoint');
  if (input.geogMultipoint) fields.push('geogMultipoint');

const query = [
    'mutation CreateTestDatum($input: CreateTestDatumInput!) {',
    '  createTestDatum(input: $input) {',
    '    testDatum {',
    fields.join(' '),
    '    }',
    '  }',
    '}'
  ].join(' ');

  console.log("query: ", JSON.stringify(query, null, 2))
  console.log("variables: ", JSON.stringify({ input: { testDatum: input }}, null, 2))
  const variables = { input: { testDatum: input }}


const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
    headers: {
      "accept": "application/json, multipart/mixed",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
      operationName: "CreateTestDatum"
    })
  });

  try {
    const data = await response.json();
    console.log("Response JSON:", JSON.stringify(data, null, 2));
    return data.data.createTestDatum.testDatum;
  } catch (error) {
    const text = await response.text();
    console.error("Failed to parse JSON:", error);
    console.log("Raw response text:", text);
  }
}