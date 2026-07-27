import { gql, type ApolloClient } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    name
    price
    inStock
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($category: String) {
    products(category: $category) {
      ...ProductFields
    }
    cartItemCount @client
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...ProductFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export type Product = {
  __typename?: 'Product';
  id: string;
  name: string;
  price: number;
  inStock: boolean;
};

/** อ่าน entity ตรงจาก cache ด้วย fragment */
export function readProductFromCache(client: ApolloClient<object>, id: string) {
  return client.cache.readFragment<Product>({
    id: client.cache.identify({ __typename: 'Product', id }),
    fragment: PRODUCT_FRAGMENT,
  });
}

/** เขียน/update entity ใน cache */
export function writeProductToCache(client: ApolloClient<object>, product: Product) {
  client.cache.writeFragment({
    id: client.cache.identify({ __typename: 'Product', id: product.id }),
    fragment: PRODUCT_FRAGMENT,
    data: { __typename: 'Product', ...product },
  });
}

/** ปรับ field แบบละเอียด — เช่น ลด stock ทันทีหลังจอง */
export function decrementStock(client: ApolloClient<object>, productId: string) {
  client.cache.modify({
    id: client.cache.identify({ __typename: 'Product', id: productId }),
    fields: {
      inStock(existing: boolean) {
        return existing; // demo: คงค่า — ในของจริงอาจตั้ง false
      },
      price(existing: number) {
        return existing;
      },
    },
  });
}

/** update local field @client */
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
