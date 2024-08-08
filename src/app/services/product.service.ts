import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../movie'; // Import your Movie interface

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiKey = '07a91e98fea0b1bff362efbcb7965881';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Get a list of popular movies
  getAllMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  // Get a single movie by its ID
  getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }
}
