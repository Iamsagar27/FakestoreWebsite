import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { ProductCardComponent } from '../products/product-card.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductCardComponent, FooterComponent, LoaderComponent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  loading = false;

  constructor(private router : Router) {}

  onShowMore() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/products']);
      this.loading = false;
    }, 500);
  }
}
