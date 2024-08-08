import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../movie';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  currentPage: BehaviorSubject<number>;
  page!:number;
  totalPages!:number;


  constructor(private productService: ProductService, private router: Router) {
    this.currentPage = new BehaviorSubject<number>(this.page);
  }

  ngOnInit(): void {
    this.currentPage.subscribe((newPage) => {
      this.subscription = this.productService
        .getAllMovies(newPage)
        .subscribe((response) => {
          this.allProducts = response.results
          this.page = response.page;
          this.totalPages = response.total_pages;
        });
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

  onNextPage(){
    if (this.page < this.totalPages) {
      this.currentPage.next(++this.page);
    }
  }

  onPrevPage(){
    if(this.page > 1){
      this.currentPage.next(--this.page);
    }
  }
}
