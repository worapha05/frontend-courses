import { gql, useApolloClient, useQuery } from '@apollo/client';
import { setCartItemCount } from './cacheHelpers';

const LOCAL_CART = gql`
  query LocalCart {
    cartItemCount @client
  }
`;

/** อ่าน/เขียน client-only field ผ่าน GraphQL */
export function CartBadgeClient() {
  const client = useApolloClient();
  const { data } = useQuery<{ cartItemCount: number }>(LOCAL_CART);

  return (
    <div>
      <span>ในตะกร้า: {data?.cartItemCount ?? 0}</span>
      <button
        type="button"
        onClick={() => setCartItemCount(client, (data?.cartItemCount ?? 0) + 1)}
      >
        +1
      </button>
    </div>
  );
}
