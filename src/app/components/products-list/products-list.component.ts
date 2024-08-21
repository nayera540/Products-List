import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../product'; // Product model
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule, NgIf],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  clickedProductId!: number;
  subscription!: Subscription;
  currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1); // Initial page is 1
  page: number = 1;
  totalPages!: number;
  totalProducts!: number;
  pageSize: number = 5; // Page size to match the backend

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to page changes
    this.currentPage.subscribe((newPage) => {
      this.page = newPage;
      this.loadProducts(newPage);
    });
  }

  loadProducts(page: number): void {
    this.subscription = this.productService.getAllProducts(page).subscribe((response) => {
      this.allProducts = response.productsData;
      this.totalProducts = response.totalCount;
      this.totalPages = Math.ceil(this.totalProducts / this.pageSize); // Calculate total pages
    });
  }

  // Navigate to product details page
  onProductClick(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  // Move to the next page
  onNextPage(): void {
    if (this.page < this.totalPages) {
      this.currentPage.next(this.page + 1);
    }
  }

  // Move to the previous page
  onPrevPage(): void {
    if (this.page > 1) {
      this.currentPage.next(this.page - 1);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
