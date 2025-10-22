import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService, Product } from './app.service';
import { CurrencyPipe } from '@angular/common';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'my-app';

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
      .pipe(takeUntilDestroyed()) // Use takeUntilDestroyed
      .subscribe((products) => {
        this.products.set(products);
      });
  }
}
