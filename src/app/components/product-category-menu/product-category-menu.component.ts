import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  

  constructor(private ProductService: ProductService  ){

  }

  ngOnInit(): void {
    this.listProductCategories();
    
  }
  listProductCategories() {
    this.ProductService.getProductCategories().subscribe(
      (      data: ProductCategory[]) =>{
        console.log('Product Categories = ' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
