import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  productName:string='';

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  onSearch(){
   this.router.navigate(['/products',this.productName]);
    this.productName='';
  }
}
