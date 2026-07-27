import { ApolloClient, HttpLink } from '@apollo/client';
import { createNormalizedCache } from './cacheConfig';
import { setCartItemCount } from './cacheHelpers';

export function createCatalogClient(uri = 'https://countries.trevorblades.com/') {
  const client = new ApolloClient({
    link: new HttpLink({ uri }),
    cache: createNormalizedCache(),
  });

  // seed local state
  setCartItemCount(client, 0);
  return client;
}
