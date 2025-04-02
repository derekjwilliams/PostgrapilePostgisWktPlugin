import { setTimeout } from 'timers/promises';

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export class GraphQLClient {
  private readonly endpoint: string;
  private readonly headers: HeadersInit;

  constructor(endpoint: string, headers: HeadersInit = {}) {
    this.endpoint = endpoint;
    this.headers = {
      'Content-Type': 'application/json',
      ...headers
    };
  }

  async request<T = any, V = Record<string, unknown>>(
    query: string,
    variables?: V,
    retries = 3,
    retryDelay = 1000
  ): Promise<T> {
    const body: RequestInit['body'] = JSON.stringify({
      query,
      variables: variables || undefined
    });

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(this.endpoint, {
          method: 'POST',
          headers: this.headers,
          body
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const { data, errors } = (await response.json()) as GraphQLResponse<T>;

        if (errors) {
          throw new AggregateError(
            errors.map(e => new Error(e.message)),
            'GraphQL Errors'
          );
        }

        return data!;
      } catch (error) {
        if (attempt >= retries) throw error;
        await setTimeout(retryDelay * attempt);
      }
    }

    throw new Error('Maximum retries exceeded');
  }

  async mutate<T = any, V = Record<string, unknown>>(
    mutation: string,
    variables?: V
  ): Promise<T> {
    return this.request<T, V>(mutation, variables);
  }

  async query<T = any, V = Record<string, unknown>>(
    query: string,
    variables?: V
  ): Promise<T> {
    return this.request<T, V>(query, variables);
  }

  // Health check endpoint for service readiness
  async healthCheck() {
    return fetch(`${this.endpoint}/health`).then(r => r.ok);
  }
}