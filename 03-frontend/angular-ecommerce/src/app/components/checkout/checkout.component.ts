import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
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
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.cartService.totalQuantity.subscribe((items:number)=>this.totalQuantity=items);
    this.cartService.totalPrice.subscribe((price:number)=>this.totalPrice=price);

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
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        shippingStreet: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
        shippingCity: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
        shippingState: new FormControl('', [Validators.required]),
        shippingCountry: new FormControl('', [Validators.required]),
        shippingCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
      }),
      billingAddress: this.formBuilder.group({
        billingStreet: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
        billingCity: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
        billingState: new FormControl('', [Validators.required]),
        billingCountry: new FormControl('', [Validators.required]),
        billingCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required]),
        cardNumber: new FormControl('', [Validators.required,Validators.pattern('^[1-9]{12}$')]),
        cvvNumber: new FormControl('', [Validators.required,Validators.pattern('^[1-9]{3}$')]),
        month: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
      }),
    });
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName');}
  get email() {return this.checkoutFormGroup.get('customer.email'); }

  get billingStreet(){return this.checkoutFormGroup.get('billingAddress.billingStreet') }
  get billingCity(){return this.checkoutFormGroup.get('billingAddress.billingCity') }
  get billingState(){return this.checkoutFormGroup.get('billingAddress.billingState') }
  get billingCountry(){return this.checkoutFormGroup.get('billingAddress.billingCountry') }
  get billingCode(){return this.checkoutFormGroup.get('billingAddress.billingCode') }

  get shippingStreet(){return this.checkoutFormGroup.get('shippingAddress.shippingStreet') }
  get shippingCity(){return this.checkoutFormGroup.get('shippingAddress.shippingCity') }
  get shippingState(){return this.checkoutFormGroup.get('shippingAddress.shippingState') }
  get shippingCountry(){return this.checkoutFormGroup.get('shippingAddress.shippingCountry') }
  get shippingCode(){return this.checkoutFormGroup.get('shippingAddress.shippingCode') }

  
  get cardType(){return this.checkoutFormGroup.get('creditCard.cardType') }
  get nameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard') }
  get cardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber') }
  get cvvNumber(){return this.checkoutFormGroup.get('creditCard.cvvNumber') }
  get month(){return this.checkoutFormGroup.get('creditCard.month') }
  get year(){return this.checkoutFormGroup.get('creditCard.year') }


  static notOnlyWhiteSpace(control:FormControl):ValidationErrors|null{
    if((control.value!=null) && (control.value.trim().length<2)){
      return {'notOnlyWhiteSpace':true};
    }else{
      return null;
    }
  }
  
  onSubmit() {
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup);
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
    const billingAddressFormGroup = this.checkoutFormGroup.get('billingAddress');
    const country = billingAddressFormGroup.value.billingCountry;
    console.log(`Country name: ${country.code}`);
    this.formService.getStatesByCountryCode(country.code).subscribe((data) => {
      this.billingStates = data;
      billingAddressFormGroup.get('billingState').setValue(data[0]);
    });
  }

  getShippingStates() {
    const shippingAddressFormGroup = this.checkoutFormGroup.get('shippingAddress');
    const country = shippingAddressFormGroup.value.shippingCountry;
    console.log(`Country name: ${country.code}`);
    this.formService.getStatesByCountryCode(country.code).subscribe((data) => {
      this.shippingStates = data;
      shippingAddressFormGroup.get('shippingState').setValue(data[0]);
    });
  }
}
