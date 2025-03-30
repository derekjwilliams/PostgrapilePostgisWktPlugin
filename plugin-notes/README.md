# Very Simple WKT only PostGIS plugin


## Example Table and Queries

using a table named `simple` with two columns, `column1` and `geolocation`, geolocation of type `public.geography(point, 4326)`

```SQL
CREATE TABLE public."simple" (
	column1 varchar NULL,
	geolocation public.geography(point, 4326) NULL,
);
```

## Example Query


```gql
query {
  allSimples(first: 1) {
    edges {
      node {
        column1
        geolocation
      }
    }
  }
}
```

Result:

```json
{
  "data": {
    "allSimples": {
      "edges": [
        {
          "node": {
            "column1": "Some Field In Eugene",
            "geolocation": "POINT(-123 40)"
          }
        }
      ]
    }
  }
}
```


## Example Mutation

```gql

mutation {
  createSimple(input: {
    simple: {
      column1: "Eiffel Tower",
      geolocation: "POINT(2.351400 48.857500)"
    }
  }) {
    simple {
      column1
      geolocation
    }
  }
}
```

Result:

```json
{
  "data": {
    "createSimple": {
      "simple": {
        "column1": "Eiffel Tower",
        "geolocation": "POINT(2.3514 48.8575)"
      }
    }
  }
}
```


## Example Code

Navigate to the example directory, run `npm install` then `npm run dev`, that will listen at http://localhost:5050