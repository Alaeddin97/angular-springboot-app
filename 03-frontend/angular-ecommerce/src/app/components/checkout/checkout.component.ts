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
  countries: Country[] = [];
  states: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.listCartDetails();

    this.formService
      .getCreditCardMonths(new Date().getMonth() + 1)
      .subscribe((data) => (this.expirationMonths = data));

    this.formService
      .getCreditCardYears()
      .subscribe((data) => (this.expirationYears = data));

    this.formService.getCountries().subscribe((data) => {
      this.countries = data;
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
      address: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutComponent.notOnlyWhiteSpace.bind(this)
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        code: new FormControl('', [
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
  get street(){return this.checkoutFormGroup.get('address.street') }
  get city(){return this.checkoutFormGroup.get('address.city') }
  get state(){return this.checkoutFormGroup.get('address.state') }
  get country(){return this.checkoutFormGroup.get('address.country') }
  get code(){return this.checkoutFormGroup.get('address.code') }
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

  listCartDetails() {
    this.cartService.totalPrice.subscribe(
      (price: number) => (this.totalPrice = price)
    );
    this.cartService.totalQuantity.subscribe(
      (quantity: number) => (this.totalQuantity = quantity)
    );
    this.cartService.computeTotals();
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

  getStates() {
    const addressFormGroup = this.checkoutFormGroup.get('address');
    const country = addressFormGroup.value.country;
    console.log(`Country name: ${country.code}`);
    this.formService.getStatesByCountryCode(country.code).subscribe((data) => {
      this.states = data;
      addressFormGroup.get('state').setValue(data[0]);
    });
  }

  reg=new RegExp('')
}
