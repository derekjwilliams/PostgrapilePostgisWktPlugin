import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:5050/graphql',
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          Geometry: 'string',  // WKT format
          Geography: 'string',
          JSON: 'Record<string, unknown>'
        }
      }
    }
  }
};

export default config;
