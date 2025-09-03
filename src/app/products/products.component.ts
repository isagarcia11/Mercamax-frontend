// src/app/products/products.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/productos';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { FiltersSidebarComponent } from './filters-sidebar/filters-sidebar.component';
import { ProductFilters } from '../../interfaces/product-filters';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule, FormsModule, MatDialogModule, MatSidenavModule,FiltersSidebarComponent]
})
export class ProductsComponent implements OnInit {

   @ViewChild('sidenav') sidenav!: MatSidenav;

  products: Product[] = [];

  filteredProducts: Product[] = [];

  searchText: string = '';

  selectedProduct: Product | null = null; 

  isEditing = false;

   showForm: boolean = false; 

    newProduct: Product = {
    nombre: '',
    codigo_barras: '',
    categoria: null,
    descripcion: '',
    precio_venta: 0,
    precio_compra: 0,
    stock_minimo: 0,
    stock_total: 0,
    punto_reorden: 0,
    proveedor: null
  };

    stockValue: number = 0;
    stockCost: number = 0;
    estimatedProfit: number = 0;
    lowStockCount: number = 0;
    outOfStockCount: number = 0;
    totalProductsCount: number = 0;
  
  constructor(private productsService: ProductsService, private dialog: MatDialog) { }

  openCreateProductDialog(): void {
    const newProduct: Product = {
      nombre: '',
      codigo_barras: '',
      categoria: null,
      descripcion: '',
      precio_venta: null,
      precio_compra: null,
      stock_minimo: 0,
      stock_total: 0,
      punto_reorden: null,
      proveedor: null
    };

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '600px',
      panelClass: 'custom-dialog-container',
      data: newProduct 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newProduct = result; 
        this.createProduct(); 
      }
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }


  openFiltersSidebar(): void {
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  // Método para aplicar los filtros del sidebar
  applyFilters(filters: ProductFilters): void {
    console.log('Filtros aplicados:', filters);
    // Aquí iría la lógica real para filtrar this.products
    // Por ahora, solo cerraremos el sidebar
    this.sidenav.close(); 

    // --- Lógica de filtrado de productos basada en 'filters' ---
    let tempFiltered = this.products;

    // Filtrar por estado de stock
    if (filters.stockStatus.outOfStock) {
      tempFiltered = tempFiltered.filter(p => p.stock_total === 0);
    }
    if (filters.stockStatus.minStock) {
        // Ejemplo: Filtrar productos cuyo stock es igual o menor al punto de reorden
        tempFiltered = tempFiltered.filter(p => p.stock_minimo !== null && p.punto_reorden !== null && p.stock_minimo <= p.punto_reorden);
    }
    // Puedes añadir más lógica para 'aboveMin' y 'noStockControl'

    // Filtrar por categorías
    if (filters.categories.length > 0) {
      tempFiltered = tempFiltered.filter(p => p.categoria && filters.categories.includes(p.categoria.nombre));
    }

    this.filteredProducts = tempFiltered;
    // La búsqueda de texto se aplicaría sobre this.filteredProducts después de esto
    this.filterProducts(); // Vuelve a aplicar el filtro de texto si existe
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.calculateSummary();
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  calculateSummary(): void {
    this.stockValue = 0;
    this.stockCost = 0;
    this.estimatedProfit = 0;
    this.lowStockCount = 0;
    this.outOfStockCount = 0;
    this.totalProductsCount = this.products.length;

   this.products.forEach(product => {

   
    const precioVenta = product.precio_venta !== null ? product.precio_venta : 0;
    const precioCompra = product.precio_compra !== null ? product.precio_compra : 0;
    const stock = product.stock_total !== null ? product.stock_total : 0;
    const puntoReorden = product.punto_reorden !== null ? product.punto_reorden : 0;

    this.stockValue += precioVenta * stock;
    this.stockCost += precioCompra * stock;
    
    if (stock <= puntoReorden) {
        this.lowStockCount++;
    }
    
    if (stock === 0) {
        this.outOfStockCount++;
    }
});

    this.estimatedProfit = this.stockValue - this.stockCost;
  }

  filterProducts(): void {
    const query = this.searchText.toLowerCase().trim();
    if (!query) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.nombre.toLowerCase().includes(query) ||
        product.codigo_barras.toLowerCase().includes(query)
      );
    }
  }

  exportProducts(): void {
    // Logic to export products, e.g., to CSV or Excel
    console.log('Exporting products...');
  }


  // Lógica para crear un producto
  createProduct(): void {
    this.productsService.createProduct(this.newProduct).subscribe(() => {
      this.getProducts();
     
      this.newProduct = {
        nombre: '',
        codigo_barras: '',
        categoria: null,
        descripcion: '',
        precio_venta: 0,
        precio_compra: 0,
       stock_minimo: 0,
        stock_total: 0,
        punto_reorden: 0,
        proveedor: null
      };
    });
  }
  

  // Lógica para editar un producto
  editProduct(product: Product): void {
    this.isEditing = true;
    this.selectedProduct = { ...product }; // Crea una copia para evitar mutar el original
  }

  // Lógica para actualizar un producto
  updateProduct(): void {
    if (this.selectedProduct && this.selectedProduct.id !== undefined) {
      this.productsService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
        this.getProducts();
        this.isEditing = false;
        this.selectedProduct = null;
      });
    }
  }

  // Lógica para borrar un producto
  deleteProduct(id: number | undefined): void {
    if (id !== undefined) {
      this.productsService.deleteProduct(id).subscribe(() => {
        this.getProducts();
      });
    }
  }
}