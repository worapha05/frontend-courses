import { gql, type ApolloClient, InMemoryCache } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ForgeProduct on Product {
    id
    name
    price
    inStock
  }
`;

export type ForgeProduct = {
  __typename?: 'Product';
  id: string;
  name: string;
  price: number;
  inStock: boolean;
};

export function createForgeApolloCache() {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cartItemCount: {
            read(existing) {
              return existing ?? 0;
            },
          },
        },
      },
    },
  });
}

export function writeProductToCache(client: ApolloClient<object>, product: ForgeProduct) {
  client.cache.writeFragment({
    id: client.cache.identify({ __typename: 'Product', id: product.id }),
    fragment: PRODUCT_FRAGMENT,
    data: { __typename: 'Product', ...product },
  });
}

export function setCartItemCount(client: ApolloClient<object>, count: number) {
  client.writeQuery({
    query: gql`
      query CartCount {
        cartItemCount @client
      }
    `,
    data: { cartItemCount: count },
  });
}
