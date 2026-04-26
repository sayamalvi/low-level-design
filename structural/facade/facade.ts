// BookMyShow

// Problem: Sub classes scattered
class PaymentService {
  makePayment(accountId: string, amount: number) {
    console.log(`Payment of Rs.${amount} successful for account ${accountId}`);
  }
}

class SeatReservationService {
  reserveSeat(movieId: string, seatNumber: string) {
    console.log(`Seat ${seatNumber} reserved for movie ${movieId}`);
  }
}

class NotificationService {
  sendBookingConfirmation(userEmail: string) {
    console.log(`Booking confirmation sent to ${userEmail}`);
  }
}

class LoyaltyPointsService {
  addPoints(accountId: string, points: number) {
    console.log(`${points} loyalty points added to account ${accountId}`);
  }
}

class TicketService {
  generateTicket(movieId: string, seatNumber: string) {
    console.log(`Ticket generated for movie ${movieId}, Seat: ${seatNumber}`);
  }
}

// Facade: Does everything
class MovieBookingFacade {
  private paymentService: PaymentService;
  private seatReservationService: SeatReservationService;
  private notificationService: NotificationService;
  private loyaltyPointsService: LoyaltyPointsService;
  private ticketService: TicketService;

  constructor() {
    this.notificationService = new NotificationService();
    this.paymentService = new PaymentService();
    this.seatReservationService = new SeatReservationService();
    this.loyaltyPointsService = new LoyaltyPointsService();
    this.ticketService = new TicketService();
  }

  // Builder pattern can be used here to build complex booking requests step-by-step.
  bookMovieTicket(
    accountId: string,
    movieId: string,
    seatNumber: string,
    userEmail: string,
    amount: number,
  ) {
    this.paymentService.makePayment(accountId, amount);
    this.seatReservationService.reserveSeat(movieId, seatNumber);
    this.ticketService.generateTicket(movieId, seatNumber);
    this.loyaltyPointsService.addPoints(accountId, 50);
    this.notificationService.sendBookingConfirmation(userEmail);

    console.log("Movie booking completed");
  }
}

const movieBookingFacade = new MovieBookingFacade();
movieBookingFacade.bookMovieTicket(
  "user123",
  "movie456",
  "A10",
  "user@example.com",
  500,
);
