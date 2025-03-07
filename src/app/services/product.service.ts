import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category'; // Import ProductCategory model

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category'; // Define category URL

  constructor(private httpClient: HttpClient) { }

  getProductlist(theCategoryId: number): Observable<Product[]> {
    // Build URL based on category ID
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string):Observable<Product[]>  {
     // Build URL based on keyword
     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

     return this.getProducts(searchUrl);
    
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  // ✅ FIXED: Implement getProductCategories()
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

// ✅ Define response interfaces
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
