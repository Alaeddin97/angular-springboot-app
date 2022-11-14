import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from './common/ProductCategory';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';
  categories:ProductCategory[]=[];
  constructor(private router:Router,private productService:ProductService){}
 
  ngOnInit(): void {
    this.productService.fetchCategories().subscribe(
      (data)=>{
        this.categories=data;
      }
    )
  }


  onCategory(category:string){
    switch(category){
      case 'Books':{
        this.router.navigate(['/category',1]);
        break;
      }
      case 'Coffee Mugs':{
        this.router.navigate(['/category',2]);
        break;
      }
      case 'Mouse Pads':{
        this.router.navigate(['/category',3]);
        break;
      }
      case 'Luggage Tags':{
        this.router.navigate(['/category',4]);
        break;
      }
    }
  }
}
