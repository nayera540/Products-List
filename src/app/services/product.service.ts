import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { MovieResponse } from '../model/movie-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiKey = '07a91e98fea0b1bff362efbcb7965881';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Get a list of popular movies
  getAllMovies(pageNumber: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${pageNumber}`);
  }

  // Get a single movie by its ID
  getMovieById(movieId: number): Observable<any> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }
}
