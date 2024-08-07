import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  allProducts: Product[] = [];
  clickedProductId!: number;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((response) => this.allProducts = response);
  }

  onProductClick(productId: number): void{
    this.router.navigate(['/product', productId]);
  }
}
