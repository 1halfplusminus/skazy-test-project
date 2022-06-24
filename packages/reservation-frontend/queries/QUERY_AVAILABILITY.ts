import { gql } from '@apollo/client';
import { GraphQLScalarType, Kind } from 'graphql';

export const QUERY_CHECK_AVAILABILITY = gql`
  # Write your query or mutation here
  query checkAvailability(
    $nbChamber: Int!
    $arrivalDate: DateTime!
    $leavingDate: DateTime!
    $email: String!
  ) {
    checkAvailability(
      nbChamber: $nbChamber
      arrivalDate: $arrivalDate
      leavingDate: $leavingDate
      email: $email
    ) {
      available
      message
      price
    }
  }
`;
