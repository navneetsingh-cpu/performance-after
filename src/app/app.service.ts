import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

@Injectable({
  providedIn: 'root', // Makes the service a singleton available app-wide
})
export class ApiService {
  // The API endpoint we're fetching data from
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  // Inject the HttpClient into the service's constructor
  constructor(private http: HttpClient) {}

  getProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
