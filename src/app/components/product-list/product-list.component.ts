import { Component, OnInit, Injector } from '@angular/core';
import { ProductStore } from 'src/app/services/product-store.service';
import { Product } from '../../services/product-database.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { effect, runInInjectionContext } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'category', 'inStock', 'actions'];
  categories = ['All', 'Electronics', 'Clothing', 'Books'];
  filterCategory = 'All';
  filteredProducts: Product[] = [];

  constructor(
    public productStore: ProductStore,
    private dialog: MatDialog,
    private injector: Injector // Inject the Injector to pass it to runInInjectionContext
  ) {}

  ngOnInit(): void {
    // Using the injector to run the effect in the correct context
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.updateFilteredProducts();
      });
    });
  }

  updateFilteredProducts(): void {
    this.filteredProducts = this.productStore.products().filter((product) =>
      this.filterCategory === 'All' ? true : product.category === this.filterCategory
    );
  }

  filterProducts(): void {
    this.updateFilteredProducts();
  }

  toggleStock(product: Product): void {
    const updatedProduct = { ...product, inStock: !product.inStock };
    this.productStore.updateProduct(updatedProduct);
  }

  deleteProduct(productId: number): void {
    this.productStore.deleteProduct(productId);
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: { product, editing: true },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productStore.updateProduct(result);
      }
    });
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: { editing: false },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productStore.addProduct(result).then(() => {
          this.updateFilteredProducts();
        });
      }
    });
  }
}
