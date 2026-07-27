import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApolloProvider } from '@apollo/client';

import { store } from './store/store';
import { createCatalogApolloClient } from './catalog/apolloClient';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15_000,
      gcTime: 5 * 60_000,
      retry: 1,
    },
  },
});

const apolloClient = createCatalogApolloClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </QueryClientProvider>
    </Provider>
  );
}
