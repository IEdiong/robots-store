import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  buyButtonClicked() {
    this.buy.emit();
  }

  getImageUrl(product: IProduct): string {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName;
  }

  getDiscountedClasses(product: IProduct) {
    if (product.discount > 0) {
      return 'strike-through';
    } else {
      return '';
    }
  }
}
