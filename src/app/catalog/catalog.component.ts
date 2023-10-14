import { Component, OnInit } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  products: IProduct[] = [];
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productSvc
      .getProducts()
      .subscribe({
        next: (products) => (this.products = products),
        error: (error) => console.log(error.message),
      });

    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  addToCart(product: IProduct): void {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts(): IProduct[] {
    return this.filter === ''
      ? this.products
      : this.products.filter((product) => product.category === this.filter);
  }
}
