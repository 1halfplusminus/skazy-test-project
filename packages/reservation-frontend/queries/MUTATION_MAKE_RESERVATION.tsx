import { gql } from '@apollo/client';

export const MUTATION_MAKE_RESERVATION = gql`
  # Write your query or mutation here
  mutation createReservation(
    $nbChamber: Int!
    $arrivalDate: DateTime!
    $leavingDate: DateTime!
    $email: String!
  ) {
    createReservation(
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
