import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Movie } from '../../movie';
import { CommonModule, NgClass } from '@angular/common';


@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  movie!: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getMovieById(movieId).subscribe(
      (movie) => {
        this.movie = movie;
      },
      (error) => {
        console.error('Error fetching movie details', error);
      }
    );
  }
}
