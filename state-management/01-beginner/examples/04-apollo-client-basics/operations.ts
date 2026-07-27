import { gql } from '@apollo/client';

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      currency
      continent {
        name
      }
    }
  }
`;
