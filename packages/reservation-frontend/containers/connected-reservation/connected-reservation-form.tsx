import { ReservationForm } from '@skazy/reservation-ui';

import { MUTATION_MAKE_RESERVATION } from '../../queries/MUTATION_MAKE_RESERVATION';
import {
  CreateReservationMutationVariables,
  CreateReservationMutation,
} from '../../graphql/generated';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { QueryCheckAvailabilityArgs, Query } from '../../graphql/generated';
import { QUERY_CHECK_AVAILABILITY } from '../../queries/QUERY_AVAILABILITY';
export const ConnectedReservationForm = () => {
  const [available, setAvailable] = useState({
    message: '',
    available: false,
    canSubmit: false,
  });

  const [makeReservation] = useMutation<
    CreateReservationMutation,
    CreateReservationMutationVariables
  >(MUTATION_MAKE_RESERVATION);
  const { data, refetch } = useQuery<Query, QueryCheckAvailabilityArgs>(
    QUERY_CHECK_AVAILABILITY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  return (
    <ReservationForm
      canSubmit={available.canSubmit}
      onChange={() => {
        setAvailable({
          available: available.available,
          message: '',
          canSubmit: false,
        });
        console.log('onChange');
      }}
      price={data?.checkAvailability.price}
      available={available.available}
      message={available.message}
      onSubmit={async (v) => {
        const r = await makeReservation({
          variables: {
            arrivalDate: v.startDate.toString(),
            leavingDate: v.endDate.toString(),
            email: v.email,
            nbChamber: v.nbChamber,
          },
        });
        setAvailable({
          available: r.data?.createReservation?.available,
          message: r.data?.createReservation?.message,
          canSubmit: false,
        });
        return r.data?.createReservation.available;
      }}
      onCheck={async (v) => {
        const r = await refetch({
          arrivalDate: v.startDate.toString(),
          leavingDate: v.endDate.toString(),
          email: v.email,
          nbChamber: v.nbChamber,
        });
        setAvailable({
          available: r.data?.checkAvailability?.available,
          message: r.data?.checkAvailability?.message,
          canSubmit: r.data?.checkAvailability?.available,
        });
      }}
    />
  );
};
