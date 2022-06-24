import {
  ApolloClient,
  gql,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';

import { useMemo } from 'react';
import { createCache } from './apollo-cache';

interface CreateLinkOptions {
  token?: string;
}

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createLink({ token }: CreateLinkOptions) {
  return new HttpLink({
    uri:
      typeof window !== 'undefined'
        ? 'http://localhost:3333/graphql'
        : 'http://localhost:3000/graphql',
    credentials: 'same-origin',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
const typeDefs = gql`
  extend type Query {
    carts: Carts!
  }
  type Carts {
    ids: [ID!]!
    inCart: Boolean!
  }
`;
function createApolloClient(options: CreateLinkOptions) {
  return new ApolloClient({
    link: createLink(options),
    cache: createCache(),
    ssrMode: typeof window === 'undefined',
    typeDefs,
  });
}

export function initializeApollo(
  initialState = null,
  options: CreateLinkOptions = {}
) {
  const _apolloClient = apolloClient ?? createApolloClient(options);

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any, options: CreateLinkOptions = {}) {
  const store = useMemo(
    () => initializeApollo(initialState, options),
    [initialState]
  );
  return store;
}
