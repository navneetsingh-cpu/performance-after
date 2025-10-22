import { Component, inject, signal } from '@angular/core';
import { ApiService, Product } from './app.service';
import { take, timer } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-app');

  showCountryBar = false;
  country = 'Germany';
  vat = 19;

  private apiService: ApiService = inject(ApiService);

  public products = signal<Product[]>([]);

  ngOnInit() {
    timer(300).subscribe(() => {
      this.showCountryBar = true;
    });

    this.apiService
      .getProducts$()
      .pipe(take(1))
      .subscribe((products) => {
        this.products.set(products);
      });
  }
}
