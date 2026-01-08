import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { ProductCardComponent } from './product-card.component';
import { FakestoreApiService } from '../../core/api/fakestore-api.service';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductCardComponent, LoaderComponent],
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage {

  showFilter = false;
  categories: string[] = [];
  selectedCategories: string[] = [];
  tempSelectedCategories: string[] = [];
  loading = false;

  constructor(private api: FakestoreApiService) {}

  toggleFilter() {
    this.showFilter = !this.showFilter;

    if (this.showFilter && this.categories.length === 0) {
      this.loading = true; 

      this.api.getCategories().subscribe({
        next: (res: any) => {
          this.categories = res;
          this.loading = false; 
        },
        error: () => {
          this.loading = false; 
        }
      });
    }
  }


  onCategoryChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.tempSelectedCategories.push(value);
    } else {
      this.tempSelectedCategories =
        this.tempSelectedCategories.filter(c => c !== value);
    }
  }

  applyFilters() {
    this.selectedCategories = [...this.tempSelectedCategories];
    this.showFilter = false;
  }

  clearFilters() {
    this.selectedCategories = [];
    this.tempSelectedCategories = []
  }
}
