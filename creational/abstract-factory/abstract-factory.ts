// Common product interface: every gateway must support payment processing.
interface PaymentGateway {
  processPayment(amount: number): void;
}

// India-specific payment gateway implementations.
class RazorpayGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log(`Processing INR payment via Razorpay: ${amount}`);
  }
}

class PayUGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log(`Processing INR payment via PayU: ${amount}`);
  }
}

// US-specific payment gateway implementations.
class PayPalGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log(`Processing USD payment via PayPal: ${amount}`);
  }
}

class StripeGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log(`Processing USD payment via Stripe: ${amount}`);
  }
}

// Common product interface: every region must provide an invoice generator.
interface Invoice {
  generateInvoice(): void;
}

// Region-specific invoice implementations.
class GSTInvoice implements Invoice {
  generateInvoice(): void {
    console.log("Generating GST Invoice for India.");
  }
}

class USInvoice implements Invoice {
  generateInvoice(): void {
    console.log("Generating Invoice as per US norms.");
  }
}

// Abstract factory: creates a family of related products for a region.
interface RegionFactory {
  createPaymentGateway(gatewayType: string): PaymentGateway;
  createInvoice(): Invoice;
}

// Concrete factory for India product family (gateways + invoice).
class IndiaFactory implements RegionFactory {
  public createPaymentGateway(gatewayType: string): PaymentGateway {
    switch (gatewayType.toLowerCase()) {
      case "razorpay":
        return new RazorpayGateway();
      case "payu":
        return new PayUGateway();
      default:
        throw new Error("Unsupported gateway in India");
    }
  }

  public createInvoice(): Invoice {
    return new GSTInvoice();
  }
}

// Concrete factory for US product family (gateways + invoice).
class USFactory implements RegionFactory {
  public createPaymentGateway(gatewayType: string): PaymentGateway {
    switch (gatewayType.toLowerCase()) {
      case "paypal":
        return new PayPalGateway();
      case "stripe":
        return new StripeGateway();
      default:
        throw new Error("Unsupported gateway in US");
    }
  }

  public createInvoice(): Invoice {
    return new USInvoice();
  }
}

// Client/service: depends only on abstractions, not concrete classes.
class CheckoutServiceWithRegionFactory {
  private paymentGateway: PaymentGateway;
  private invoice: Invoice;

  // Factory decides which concrete products to instantiate.
  constructor(factory: RegionFactory, gatewayType: string) {
    this.paymentGateway = factory.createPaymentGateway(gatewayType);
    this.invoice = factory.createInvoice();
  }

  // Business flow remains independent of region-specific implementations.
  completeOrder(amount: number) {
    this.paymentGateway.processPayment(amount);
    this.invoice.generateInvoice();
  }
}

// India checkout uses IndiaFactory products.
const indiaCheckout = new CheckoutServiceWithRegionFactory(
  new IndiaFactory(),
  "razorpay"
);
indiaCheckout.completeOrder(1999);

// US checkout uses USFactory products.
const usCheckout = new CheckoutServiceWithRegionFactory(
  new USFactory(),
  "paypal"
);
usCheckout.completeOrder(49.99);
