import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    continents {
      code
      name
    }
  }
`;

/** ใช้ public API เป็น stand-in ของ catalog categories */
export function createCatalogApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: 'https://countries.trevorblades.com/' }),
    cache: new InMemoryCache(),
  });
}
