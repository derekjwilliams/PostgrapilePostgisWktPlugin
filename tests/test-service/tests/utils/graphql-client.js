import { setTimeout } from 'timers/promises';
export class GraphQLClient {
    endpoint;
    headers;
    constructor(endpoint, headers = {}) {
        this.endpoint = endpoint;
        this.headers = {
            'Content-Type': 'application/json',
            ...headers
        };
    }
    async request(query, variables, retries = 3, retryDelay = 1000) {
        const body = JSON.stringify({
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
                const { data, errors } = (await response.json());
                if (errors) {
                    throw new AggregateError(errors.map(e => new Error(e.message)), 'GraphQL Errors');
                }
                return data;
            }
            catch (error) {
                if (attempt >= retries)
                    throw error;
                await setTimeout(retryDelay * attempt);
            }
        }
        throw new Error('Maximum retries exceeded');
    }
    async mutate(mutation, variables) {
        return this.request(mutation, variables);
    }
    async query(query, variables) {
        return this.request(query, variables);
    }
    // Health check endpoint for service readiness
    async healthCheck() {
        return fetch(`${this.endpoint}/health`).then(r => r.ok);
    }
}
