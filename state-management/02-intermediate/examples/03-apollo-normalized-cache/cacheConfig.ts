import { InMemoryCache, type TypePolicies } from '@apollo/client';

/**
 * Normalized cache config
 * - Product ใช้ id เป็น key
 * - Query.products แยก cache ตาม filter args (keyArgs)
 */
export const typePolicies: TypePolicies = {
  Product: {
    keyFields: ['id'],
  },
  Query: {
    fields: {
      products: {
        keyArgs: ['category'], // page ไม่ใส่ใน keyArgs ถ้าจะ merge เอง
      },
      product: {
        read(_, { args, toReference }) {
          return args?.id ? toReference({ __typename: 'Product', id: args.id }) : undefined;
        },
      },
      /** Client-only field */
      cartItemCount: {
        read(existing) {
          return existing ?? 0;
        },
      },
    },
  },
};

export function createNormalizedCache() {
  return new InMemoryCache({ typePolicies });
}
