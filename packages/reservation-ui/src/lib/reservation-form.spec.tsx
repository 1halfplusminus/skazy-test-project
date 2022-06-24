import { render } from '@testing-library/react';

import ReservationUi from './reservation-form';

describe('ReservationUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReservationUi />);
    expect(baseElement).toBeTruthy();
  });
});
