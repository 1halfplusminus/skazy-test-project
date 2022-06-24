import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';
import Box from '@mui/material/Box';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import {
  addDays,
  endOfDay,
  isBefore,
  isMonday,
  isSunday,
  startOfDay,
} from 'date-fns';
import tw from 'twin.macro';
import styled from '@emotion/styled';

export interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onSelect: (startDate: Date, endDate: Date) => void;
}
const StyledDateRangePicker = styled.div`
  ${tw`
    flex
    gap-2
    items-center
    flex-grow
  `}
`;
export default function DateRangePicker({
  startDate,
  endDate,
  onSelect,
}: DateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
      <StyledDateRangePicker>
        <DesktopDatePicker
          shouldDisableDate={(d) => isMonday(d) || isSunday(d)}
          disablePast={true}
          inputFormat="MM/dd/yyyy"
          value={startDate}
          onChange={(newStartDate) => {
            if (newStartDate) {
              const newEndDate: Date = isBefore(endDate, newStartDate)
                ? addDays(newStartDate, 1)
                : endDate;
              onSelect(startOfDay(newStartDate), endOfDay(newEndDate));
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box> au </Box>
        <DesktopDatePicker
          shouldDisableDate={(d) => isMonday(d)}
          minDate={addDays(startDate, 1)}
          inputFormat="MM/dd/yyyy"
          value={endDate}
          onChange={(newEndDate) => {
            if (newEndDate) {
              onSelect(startOfDay(startDate), endOfDay(newEndDate));
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </StyledDateRangePicker>
    </LocalizationProvider>
  );
}
