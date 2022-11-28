import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  expirationMonths: number[] = [];
  expirationYears: number[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  startMonth: number = 0;
  billingCountries: Country[] = [];
  shippingCountries: Country[] = [];
  billingStates: State[] = [];
  shippingStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.cartService.totalQuantity.subscribe(
      (items: number) => (this.totalQuantity = items)
    );
    this.cartService.totalPrice.subscribe(
      (price: number) => (this.totalPrice = price)
    );

    this.formService
      .getCreditCardMonths(new Date().getMonth() + 1)
      .subscribe((data) => (this.expirationMonths = data));

    this.formService
      .getCreditCardYears()
      .subscribe((data) => (this.expirationYears = data));

    this.formService.getCountries().subscribe((data) => {
      this.billingCountries = data;
      this.shippingCountries = data;
    });

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('Jhon', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this),
        ]),
        lastName: new FormControl('Doe', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this),
        ]),
        email: new FormControl('jhon.doe@gmail.com', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('JW', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this),
        ]),
        city: new FormControl('Washington', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this),
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('92300', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this),
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('JW', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this),
        ]),
        city: new FormControl('Washington', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this),
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('92300', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this),
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('Jhon', [Validators.required]),
        cardNumber: new FormControl('111111111111', [
          Validators.required,
          Validators.pattern('^[1-9]{12}$'),
        ]),
        cvvNumber: new FormControl('111', [
          Validators.required,
          Validators.pattern('^[1-9]{3}$'),
        ]),
        month: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
      }),
    });
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get billingStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get billingCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get shippingStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get shippingCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get cardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get nameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get cardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get cvvNumber() {
    return this.checkoutFormGroup.get('creditCard.cvvNumber');
  }
  get month() {
    return this.checkoutFormGroup.get('creditCard.month');
  }
  get year() {
    return this.checkoutFormGroup.get('creditCard.year');
  }

  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length < 2) {
      return { notOnlyWhiteSpace: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup);

    let order: Order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems: CartItem[] = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(
      (cartItem) => new OrderItem(cartItem)
    );

    let purchase: Purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.get('customer').value;
    purchase.billingAddress =
      this.checkoutFormGroup.get('billingAddress').value;
    purchase.shippingAddress =
      this.checkoutFormGroup.get('shippingAddress').value;
    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log(purchase);

    this.checkoutService
      .placeOrder(purchase)
      .subscribe(
       {
        next:(response)=>{
          alert(`Order successfully saved. Here is your order code:${response.orderTrackingNumber}`);
          this.checkoutFormGroup.reset();
          this.router.navigateByUrl('/products')
          
        },
        error:err=>{
          alert(`There was an error :${err.message}`)
        }
       }
      );
  }

  handleMonthYearSelection() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const selectedYear: number = Number(creditCardFormGroup.value.year);

    if (selectedYear === new Date().getFullYear()) {
      this.startMonth = new Date().getMonth() + 1;
    } else {
      this.startMonth = 1;
    }

    this.formService
      .getCreditCardMonths(this.startMonth)
      .subscribe((data) => (this.expirationMonths = data));
  }

  getBillingStates() {
    const billingAddressFormGroup =
      this.checkoutFormGroup.get('billingAddress');
    const country = billingAddressFormGroup.value.country;
    this.formService.getStatesByCountryCode(country.code).subscribe((data) => {
      this.billingStates = data;
      billingAddressFormGroup.get('state').setValue(data[0]);
    });
  }

  getShippingStates() {
    const shippingAddressFormGroup =
      this.checkoutFormGroup.get('shippingAddress');
    const country = shippingAddressFormGroup.value.country;
    this.formService.getStatesByCountryCode(country.code).subscribe((data) => {
      this.shippingStates = data;
      shippingAddressFormGroup.get('state').setValue(data[0]);
    });
  }
}
