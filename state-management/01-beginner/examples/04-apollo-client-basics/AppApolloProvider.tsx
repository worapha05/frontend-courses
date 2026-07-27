import { ApolloProvider } from '@apollo/client';
import type { ReactNode } from 'react';

import { createApolloClient } from './apolloClient';

const client = createApolloClient();

export function AppApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
