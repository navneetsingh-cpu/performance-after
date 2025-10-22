import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService, Product } from './app.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'my-app';

  private apiService: ApiService = inject(ApiService);

  public products = signal<Product[]>([]);

  ngOnInit() {
    this.apiService.getProducts$().subscribe((products) => {
      this.products.set(products);
    });
  }
}
