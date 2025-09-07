// src/app/products/product-dialog/product-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Product } from '../../interfaces/producto';
import { ProductsService } from '../../services/products.service';

// Importaciones de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CategoriaProducto } from '../../interfaces/categoria-producto';
import { Proveedor } from '../../interfaces/proveedor';
import { CategoriaDropdown } from '../../interfaces/categoria-dropdown';



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
export class ProductDialogComponent implements OnInit{

  categorias: CategoriaProducto[] = [];
  proveedores: Proveedor [] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productsService: ProductsService) {}
    
  

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(data => {
      this.categorias = data;
    });

    this.productsService.getProveedor().subscribe(data => {
    this.proveedores = data;
  });

  }

  onSave(): void {
    if (this.data.precio_compra === null) {
    this.data.precio_compra = 0; // fallback
  }
    this.dialogRef.close(this.data);
}

  onCancel(): void {
    this.dialogRef.close();
  }
}