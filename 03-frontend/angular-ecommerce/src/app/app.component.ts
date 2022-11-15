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
      (categories:ProductCategory[])=>{
        this.categories=categories;
      }
    )
  }


  onCategory(category:string){
    switch(category){
      case this.categories[0].categoryName:{
        this.router.navigate(['/category',1]);
        break;
      }
      case this.categories[1].categoryName:{
        this.router.navigate(['/category',2]);
        break;
      }
      case this.categories[2].categoryName:{
        this.router.navigate(['/category',3]);
        break;
      }
      case this.categories[3].categoryName:{
        this.router.navigate(['/category',4]);
        break;
      }
    }
  }
}
