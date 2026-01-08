import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FakestoreApiService } from '../../core/api/fakestore-api.service';
import { CartService } from '../cart/cart.service';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ToastService } from 'src/app/shared/components/toast/toast.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  exportAs: 'productCard',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  products: any[] = [];
  loading = false;
  error = '';
  currentPage = 1;
  itemsPerPage = 16;
  totalPages = 0;
  allProducts: any[] = [];

  @Input() limit?: number;
  @Input() categories: string[] = [];
  @Input() related = false;

  constructor(private api: FakestoreApiService, private cartService : CartService, private router: Router, private toast : ToastService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnChanges() {
    this.getProducts();
  }

  openProduct(id: number) {
    this.loading = true;

    setTimeout(() => {
      this.router.navigate(['/products', id]);
      this.loading = false;
    }, 300); 
  }

  getProducts(): void {
    this.loading = true;

    this.api.getProducts().subscribe({
      next: (res) => {
        let mapped = res.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category,
          price: p.price,
          oldPrice: '',
          image: p.image,
          discount: ''
        }));

        if (this.categories.length > 0) {
          mapped = mapped.filter(p =>
            this.categories.includes(p.category)
          );
        }

        if (this.limit) {
          this.products = mapped.slice(0, this.limit);
        } 
        else {
          this.allProducts = mapped;
          this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
          this.setPage(1);
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }


  addToCart(product: any, event: Event) {
    event.stopPropagation();
    this.loading = true;
    try {
      this.cartService.addToCart(product);
      this.loading = false;
      this.toast.showToast('Product added to cart', 'success');
    } catch (e) {
      this.loading = false;
      this.toast.showToast('Failed to add product', 'error');
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;

    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.products = this.allProducts.slice(start, end);
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
