import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../movie';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  allProducts: Movie[] = [];
  clickedProductId!: number;
  subscription!: Subscription;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.productService
      .getAllMovies()
      .subscribe((response) => {
        this.allProducts = response.results;
      });
  }

  onProductClick(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
