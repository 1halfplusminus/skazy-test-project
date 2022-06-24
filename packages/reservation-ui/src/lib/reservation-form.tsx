import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import styled from '@emotion/styled';
import tw from 'twin.macro';
import { useFormik } from 'formik';
import DateRangePicker from './date-range-picker';
import { css } from '@emotion/react';
import { addDays } from 'date-fns';
import { NumberFormat } from './number-format';
import { useEffect } from 'react';

interface ReservationFormInput {
  nbChild: number;
  nbAdult: number;
  nbChamber: number;
  startDate: Date;
  endDate: Date;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  button: 'check' | 'reserve' | '';
  email: string;
}
/* eslint-disable-next-line */
export interface ReservationFormProps {
  nbChildPerRoom?: number;
  nbAdultPerRoom?: number;
  maxChamber?: number;
  onSubmit: (input: ReservationFormInput) => Promise<boolean>;
  onCheck: (input: ReservationFormInput) => Promise<void>;
  onChange: () => void;
  available: boolean;
  message: string;
  price: number;
  canSubmit: boolean;
}

const generateId = (id: string) => `reservation-form-${id}`;
const generateLabelId = (id: string) => generateId(id) + -'-label';
const StyledReservationForm = styled.form`
  ${tw`
    flex
    flex-wrap
    gap-2
    flex-col
  `}
`;
const Row = styled.div`
  ${tw`
    flex
    flex-1
    gap-2

  `}
`;

export function ReservationForm({
  nbAdultPerRoom = 2,
  nbChildPerRoom = 1,
  maxChamber = 3,
  onSubmit,
  available,
  message = '',
  onCheck,
  price,
  onChange,
  canSubmit,
}: ReservationFormProps) {
  const formik = useFormik({
    initialValues: {
      nbChild: 0,
      nbAdult: 1,
      nbChamber: 1,
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      button: '',
    } as ReservationFormInput,
    onSubmit: async (v) => {
      if (v.button === 'check') {
        await onCheck(v);
      } else if (v.button === 'reserve') {
        const ok = await onSubmit(v);
        if (ok) {
          formik.resetForm({ submitCount: 0 });
        }
      }
    },
  });

  return (
    <StyledReservationForm onSubmit={formik.handleSubmit}>
      {message ? (
        <Alert severity={available ? 'success' : 'error'}>
          {!available ? message : ''}
          {available
            ? formik.values.button === 'check'
              ? ' Chambre disponible ! Cliquez sur le bouton réserver pour passer votre réservation'
              : ' Votre réservation a bien été prise en compte ! Un email va être envoyé avec toutes les informations.'
            : null}
        </Alert>
      ) : null}

      <Row
        css={css`
          ${tw`flex-wrap row-auto items-center`}
        `}
      >
        <FormControl>
          <TextField
            css={css`
              ${tw`w-36`}
            `}
            required
            hiddenLabel={false}
            placeholder="Doe"
            label="Nombre de chambre"
            name="nbChamber"
            onChange={(e) => {
              formik.handleChange(e);
              onChange();
            }}
            value={formik.values.nbChamber}
            type="number"
            InputProps={{ inputProps: { min: 0, max: maxChamber } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <div
          css={css`
            ${tw`flex-col flex flex-1 gap-2`}
          `}
        >
          <FormControl fullWidth>
            <InputLabel id={generateLabelId('nbAdult')}>
              Nombre d'Adulte
            </InputLabel>
            <Select
              name="nbAdult"
              labelId={generateLabelId('nbAdult')}
              id={generateLabelId('nbAdult')}
              value={formik.values.nbAdult}
              onChange={formik.handleChange}
            >
              {[...Array(formik.values.nbChamber * nbAdultPerRoom).keys()].map(
                (i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1} adulte{i + 1 > 1 ? 's' : ''}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="reservation-form-nbChild-label">
              Nombre d'enfant
            </InputLabel>
            <Select
              name="nbChild"
              labelId="reservation-form-nbChild"
              id="reservation-form-nbChild"
              value={formik.values.nbChild}
              onChange={formik.handleChange}
            >
              <MenuItem value={0}>Pas d'enfant</MenuItem>
              {[...Array(formik.values.nbChamber * nbChildPerRoom).keys()].map(
                (i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1} enfant{i + 1 > 1 ? 's' : ''}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>

        <DateRangePicker
          startDate={formik.values.startDate}
          endDate={formik.values.endDate}
          onSelect={(startDate, endDate) => {
            formik.setFieldValue('startDate', startDate);
            formik.setFieldValue('endDate', endDate);
            onChange();
          }}
        />
      </Row>
      <Row>
        <TextField
          hiddenLabel={false}
          required
          placeholder="John"
          label="Nom"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <TextField
          required
          hiddenLabel={false}
          placeholder="Doe"
          label="Prénom"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
      </Row>
      <Row>
        <TextField
          required
          hiddenLabel={false}
          placeholder="john.doe@mail.com"
          label="Email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Row>
      {canSubmit ? (
        <Row>
          <h2
            css={css`
              ${tw`text-white`}
            `}
          >
            Prix de votre réservation: &nbsp;
            <span
              css={css`
                ${tw`text-red-400`}
              `}
            >
              <NumberFormat>{price}</NumberFormat>
            </span>
          </h2>
        </Row>
      ) : null}
      <Row
        css={css`
          ${tw`justify-center mt-4`}
        `}
      >
        <Button
          css={css`
            ${tw`bg-indigo-500`}
          `}
          type="submit"
          variant="contained"
          onClick={() => {
            formik.setFieldValue('button', 'check');
          }}
        >
          Voir les disponibilités
        </Button>
        <Button
          onClick={() => {
            formik.setFieldValue('button', 'reserve');
          }}
          css={css`
            ${tw`bg-indigo-500`}
          `}
          type="submit"
          variant="contained"
          disabled={!canSubmit}
        >
          Réserver
        </Button>
      </Row>
    </StyledReservationForm>
  );
}

export default ReservationForm;
