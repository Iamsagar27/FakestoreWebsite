import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { ProductCardComponent } from './product-card.component';
import { FakestoreApiService } from '../../core/api/fakestore-api.service';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ToastService } from 'src/app/shared/components/toast/toast.service';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, ProductCardComponent, RouterLink, LoaderComponent],
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss']
})
export class ProductDetailsPage implements OnInit {

  product: any;
  quantity = 1;
  selectedCategories: string[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private api: FakestoreApiService,
    private cart: CartService,
    private toast : ToastService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!id) return;

      this.fetchProduct(id);
    });
  }

  fetchProduct(id: number) {
    this.loading = true;

    this.api.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;
        this.quantity = 1; 
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.showToast('Failed to load product', 'error');
      }
    });
  }

  addToCart() {
    this.loading =true;
    try {
      this.cart.addToCart({
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        image: this.product.image,
        quantity: this.quantity
      });
      this.loading =false;
      this.toast.showToast('Product added to cart', 'success');

    } catch {
      this.loading =false;
      this.toast.showToast('Failed to add product', 'error');
    }
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
