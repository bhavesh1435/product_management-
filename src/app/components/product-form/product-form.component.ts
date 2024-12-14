import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../services/product-database.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories = ['Electronics', 'Clothing', 'Books'];
  editing: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product; editing: boolean }
  ) {
    this.editing = data.editing;
    this.productForm = this.fb.group({
      id: [data.product?.id || null],
      name: [data.product?.name || '', Validators.required],
      price: [data.product?.price || '', [Validators.required, Validators.min(0)]],
      category: [data.product?.category || '', Validators.required],
      inStock: [data.product?.inStock || false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
