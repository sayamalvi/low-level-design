interface PaymentGateway {
  pay(orderId: string, amount: number): void;
}

class PayUGateway implements PaymentGateway {
  pay(orderId: string, amount: number): void {
    console.log(`Pay Rs. ${amount}, ${orderId}`);
  }
}

class RazorpayAPI {
  makePayment(invoiceId: string, amountInRs: number) {
    console.log(`Pay Rs. ${amountInRs}, ${invoiceId}`);
  }
}

class RazorpayAdapter implements PaymentGateway {
  private razorpayApi: RazorpayAPI;
  constructor() {
    this.razorpayApi = new RazorpayAPI();
  }
  pay(orderId: string, amount: number): void {
    this.razorpayApi.makePayment(orderId, amount);
  }
}

class CheckoutService {
  private paymentGateway: PaymentGateway;
  constructor(paymentGateway: PaymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  checkout(orderId: string, amount: number) {
    this.paymentGateway.pay(orderId, amount);
  }
}

const checkoutService = new CheckoutService(new PayUGateway());
const checkoutService2 = new CheckoutService(new RazorpayAdapter());
checkoutService.checkout("12", 434);
