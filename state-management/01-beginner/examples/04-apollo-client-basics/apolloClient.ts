import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

/**
 * Public GraphQL demo API (Countries)
 * ใน project จริงเปลี่ยน uri เป็น backend ของคุณ
 */
export function createApolloClient(uri = 'https://countries.trevorblades.com/') {
  return new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache({
      // typePolicies ละเอียดอยู่ระดับ Intermediate
      typePolicies: {
        Query: {
          fields: {
            // ตัวอย่าง: country(code) แยกตาม args
            country: {
              read(_, { args, toReference }) {
                return args?.code
                  ? toReference({ __typename: 'Country', code: args.code })
                  : undefined;
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  });
}
