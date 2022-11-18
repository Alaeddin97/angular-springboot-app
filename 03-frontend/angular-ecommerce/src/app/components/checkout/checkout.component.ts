import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  countries:Country[]=[];
  states:State[]=[];

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

    this.formService.getCountries().subscribe(
      (data)=>{
        this.countries=data;
      }
    )  
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        code: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        cvvNumber: [''],
        month: [0],
        year: [0],
      }),
    });
  }

  onSubmit() {
    console.log(this.checkoutFormGroup.value);
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

  getStates(){
    
    const addressFormGroup = this.checkoutFormGroup.get('address');
    const country=addressFormGroup.value.city;
    console.log(`Country name: ${country.code}`);
    this.formService.getStatesByCountryCode(country.code).subscribe(
      (data)=>{
        this.states=data;
        addressFormGroup.get('state').setValue(data[0]);
      }
    )
  }
}
