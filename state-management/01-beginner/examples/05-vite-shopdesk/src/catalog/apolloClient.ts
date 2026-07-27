import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    continents {
      code
      name
    }
  }
`;

export function createCatalogApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: 'https://countries.trevorblades.com/' }),
    cache: new InMemoryCache(),
  });
}
