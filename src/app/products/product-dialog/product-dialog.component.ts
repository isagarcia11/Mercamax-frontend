// src/app/products/product-dialog/product-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Product } from '../../../interfaces/productos';

// Importaciones de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CategoriaProducto } from '../../../interfaces/categoria-producto';
import { CategoriaDropdown } from '../../../interfaces/categoria-dropdown';



@Component({
  selector: 'app-product-dialog',
  standalone: true,
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    // Módulos de Angular Material para el diálogo
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatError,
    MatSelectModule
  ],
})
export class ProductDialogComponent {


  data1 = {
    categoria: null
  };

  categorias: CategoriaDropdown[] = [
    { value: 'bebidas', viewValue: 'Bebidas' },
    { value: 'snacks', viewValue: 'Snacks' },
    { value: 'electronicos', viewValue: 'Electrónicos' },
    { value: 'hogar', viewValue: 'Hogar' },
  ];

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {}

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}