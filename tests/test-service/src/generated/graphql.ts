export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Cursor: { input: any; output: any; }
  Datetime: { input: any; output: any; }
};

/** All input for the create `TestDatum` mutation. */
export type CreateTestDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TestDatum` to be created by this mutation. */
  testDatum: TestDatumInput;
};

/** The output of our create `TestDatum` mutation. */
export type CreateTestDatumPayload = {
  __typename?: 'CreateTestDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TestDatum` that was created by this mutation. */
  testDatum?: Maybe<TestDatum>;
  /** An edge for our `TestDatum`. May be used by Relay 1. */
  testDatumEdge?: Maybe<TestDatumEdge>;
};


/** The output of our create `TestDatum` mutation. */
export type CreateTestDatumPayloadTestDatumEdgeArgs = {
  orderBy?: Array<TestDatumOrderBy>;
};

/** All input for the `deleteTestDatumByRowId` mutation. */
export type DeleteTestDatumByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['Int']['input'];
};

/** All input for the `deleteTestDatum` mutation. */
export type DeleteTestDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TestDatum` to be deleted. */
  id: Scalars['ID']['input'];
};

/** The output of our delete `TestDatum` mutation. */
export type DeleteTestDatumPayload = {
  __typename?: 'DeleteTestDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTestDatumId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TestDatum` that was deleted by this mutation. */
  testDatum?: Maybe<TestDatum>;
  /** An edge for our `TestDatum`. May be used by Relay 1. */
  testDatumEdge?: Maybe<TestDatumEdge>;
};


/** The output of our delete `TestDatum` mutation. */
export type DeleteTestDatumPayloadTestDatumEdgeArgs = {
  orderBy?: Array<TestDatumOrderBy>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `TestDatum`. */
  createTestDatum?: Maybe<CreateTestDatumPayload>;
  /** Deletes a single `TestDatum` using its globally unique id. */
  deleteTestDatum?: Maybe<DeleteTestDatumPayload>;
  /** Deletes a single `TestDatum` using a unique key. */
  deleteTestDatumByRowId?: Maybe<DeleteTestDatumPayload>;
  /** Updates a single `TestDatum` using its globally unique id and a patch. */
  updateTestDatum?: Maybe<UpdateTestDatumPayload>;
  /** Updates a single `TestDatum` using a unique key and a patch. */
  updateTestDatumByRowId?: Maybe<UpdateTestDatumPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTestDatumArgs = {
  input: CreateTestDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTestDatumArgs = {
  input: DeleteTestDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTestDatumByRowIdArgs = {
  input: DeleteTestDatumByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTestDatumArgs = {
  input: UpdateTestDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTestDatumByRowIdArgs = {
  input: UpdateTestDatumByRowIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `TestDatum`. */
  allTestData?: Maybe<TestDatumConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a single `TestDatum` using its globally unique `ID`. */
  testDatum?: Maybe<TestDatum>;
  /** Get a single `TestDatum`. */
  testDatumByRowId?: Maybe<TestDatum>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllTestDataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TestDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TestDatumOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTestDatumArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTestDatumByRowIdArgs = {
  rowId: Scalars['Int']['input'];
};

export type TestDatum = Node & {
  __typename?: 'TestDatum';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  geogLine?: Maybe<Scalars['String']['output']>;
  geogMultipoint?: Maybe<Scalars['String']['output']>;
  geogPoint?: Maybe<Scalars['String']['output']>;
  geogPolygon?: Maybe<Scalars['String']['output']>;
  geogPolygonWithHoles?: Maybe<Scalars['String']['output']>;
  geomLine?: Maybe<Scalars['String']['output']>;
  geomMultipoint?: Maybe<Scalars['String']['output']>;
  geomPoint?: Maybe<Scalars['String']['output']>;
  geomPolygon?: Maybe<Scalars['String']['output']>;
  geomPolygonWithHoles?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['Int']['output'];
};

/**
 * A condition to be used against `TestDatum` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TestDatumCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `TestDatum` values. */
export type TestDatumConnection = {
  __typename?: 'TestDatumConnection';
  /** A list of edges which contains the `TestDatum` and cursor to aid in pagination. */
  edges: Array<Maybe<TestDatumEdge>>;
  /** A list of `TestDatum` objects. */
  nodes: Array<Maybe<TestDatum>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TestDatum` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TestDatum` edge in the connection. */
export type TestDatumEdge = {
  __typename?: 'TestDatumEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TestDatum` at the end of the edge. */
  node?: Maybe<TestDatum>;
};

/** An input for mutations affecting `TestDatum` */
export type TestDatumInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  geogLine?: InputMaybe<Scalars['String']['input']>;
  geogMultipoint?: InputMaybe<Scalars['String']['input']>;
  geogPoint?: InputMaybe<Scalars['String']['input']>;
  geogPolygon?: InputMaybe<Scalars['String']['input']>;
  geogPolygonWithHoles?: InputMaybe<Scalars['String']['input']>;
  geomLine?: InputMaybe<Scalars['String']['input']>;
  geomMultipoint?: InputMaybe<Scalars['String']['input']>;
  geomPoint?: InputMaybe<Scalars['String']['input']>;
  geomPolygon?: InputMaybe<Scalars['String']['input']>;
  geomPolygonWithHoles?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

/** Methods to use when ordering `TestDatum`. */
export enum TestDatumOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `TestDatum`. Fields that are set will be updated. */
export type TestDatumPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  geogLine?: InputMaybe<Scalars['String']['input']>;
  geogMultipoint?: InputMaybe<Scalars['String']['input']>;
  geogPoint?: InputMaybe<Scalars['String']['input']>;
  geogPolygon?: InputMaybe<Scalars['String']['input']>;
  geogPolygonWithHoles?: InputMaybe<Scalars['String']['input']>;
  geomLine?: InputMaybe<Scalars['String']['input']>;
  geomMultipoint?: InputMaybe<Scalars['String']['input']>;
  geomPoint?: InputMaybe<Scalars['String']['input']>;
  geomPolygon?: InputMaybe<Scalars['String']['input']>;
  geomPolygonWithHoles?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

/** All input for the `updateTestDatumByRowId` mutation. */
export type UpdateTestDatumByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `TestDatum` being updated. */
  testDatumPatch: TestDatumPatch;
};

/** All input for the `updateTestDatum` mutation. */
export type UpdateTestDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TestDatum` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TestDatum` being updated. */
  testDatumPatch: TestDatumPatch;
};

/** The output of our update `TestDatum` mutation. */
export type UpdateTestDatumPayload = {
  __typename?: 'UpdateTestDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TestDatum` that was updated by this mutation. */
  testDatum?: Maybe<TestDatum>;
  /** An edge for our `TestDatum`. May be used by Relay 1. */
  testDatumEdge?: Maybe<TestDatumEdge>;
};


/** The output of our update `TestDatum` mutation. */
export type UpdateTestDatumPayloadTestDatumEdgeArgs = {
  orderBy?: Array<TestDatumOrderBy>;
};
