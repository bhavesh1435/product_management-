import { Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { ProductDatabaseService, Product } from '../services/product-database.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private _products = signal<Product[]>([]);

  get products(): Signal<Product[]> {
    return this._products;
  }

  constructor(private productDb: ProductDatabaseService) {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    const products = await this.productDb.getProducts();
    this._products.set(products);
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<void> {
    const newProduct = { ...product } as Product;
    await this.productDb.addProduct(newProduct);
    this._products.set(await this.productDb.getProducts());
  }

  async updateProduct(product: Product): Promise<void> {
    await this.productDb.updateProduct(product);
    this._products.set(await this.productDb.getProducts());
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.productDb.deleteProduct(productId);
    this._products.set(await this.productDb.getProducts());
  }
}
