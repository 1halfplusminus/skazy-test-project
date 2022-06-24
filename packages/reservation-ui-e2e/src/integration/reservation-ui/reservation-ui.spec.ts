describe('reservation-ui: ReservationUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=reservationui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ReservationUi!');
    });
});
