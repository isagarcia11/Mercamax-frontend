// src/app/products/products.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 

// Interfaces y Servicios
import { Product } from '../interfaces/productos';
import { CategoriaProducto } from '../interfaces/categoria-producto';
import { ProductsService } from '../../services/services/products.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { FiltersSidebarComponent } from './filters-sidebar/filters-sidebar.component';

// Importaciones de Angular Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    RouterModule,
    FiltersSidebarComponent
  ]
})
export class ProductsComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  // --- Propiedades para los Datos ---
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  allCategories: CategoriaProducto[] = [];

  // --- Propiedades para las Tarjetas de Resumen ---
  stockValue: number = 0;
  stockCost: number = 0;
  estimatedProfit: number = 0;
  totalProductsCount: number = 0;

  // --- Propiedades de Estado y UI ---
  searchText: string = '';
  isLoading: boolean = true;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    
    // 1. Cargar las categorías primero para poder usarlas en la tabla
    this.productsService.getCategories().subscribe({
      next: (categories) => {
        this.allCategories = categories;
        
        // 2. Una vez que tenemos las categorías, cargamos los productos
        this.productsService.getProducts().subscribe({
          next: (products) => {
            this.allProducts = products;
            this.filteredProducts = products;
            this.totalProductsCount = products.length;
            this.calculateSummaryMetrics(); // Calculamos los totales
            this.isLoading = false; // Terminamos de cargar
          },
          error: (err) => {
            console.error('Error al obtener los productos:', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
        this.isLoading = false;
      }
    });
  }
  
  // Calcula los valores para las tarjetas de resumen
  calculateSummaryMetrics(): void {
    this.stockValue = this.allProducts.reduce(
      (sum, product) => sum + ((product.stock_total || 0) * product.precio_venta), 0
    );

    this.stockCost = this.allProducts.reduce(
      (sum, product) => sum + ((product.stock_total || 0) * (product.costo_promedio_ponderado || 0)), 0
    );

    this.estimatedProfit = this.stockValue - this.stockCost;
  }

  // "Traduce" el ID de la categoría a su nombre para mostrarlo en la tabla
  getCategoryName(categoryId: number): string {
    const category = this.allCategories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Sin Categoría';
  }

  // Filtra la lista de productos basado en el texto de búsqueda
  filterProducts(): void {
    if (!this.searchText) {
      this.filteredProducts = this.allProducts;
    } else {
      const query = this.searchText.toLowerCase().trim();
      this.filteredProducts = this.allProducts.filter(product =>
        product.nombre.toLowerCase().includes(query) ||
        product.codigo_barras.includes(query)
      );
    }
  }

  // --- Métodos de Acciones del Usuario ---

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '600px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInitialData(); // Recargamos todos los datos para reflejar el cambio
      }
    });
  }
  
  viewProduct(productId?: number): void {
    if (productId) {
      console.log(`Navegando al detalle del producto con ID: ${productId}`);
      // Aquí iría la lógica para navegar a una nueva ruta, ej: this.router.navigate(['/products', productId]);
    }
  }

  editProduct(product: Product, event: MouseEvent): void {
    event.stopPropagation(); // Evita que el clic active el viewProduct de la fila
    console.log('Editando producto:', product);
    // Lógica para abrir el diálogo en modo edición
    // const dialogRef = this.dialog.open(ProductDialogComponent, { width: '600px', data: { ...product } });
    // ...
  }

  deleteProduct(productId: number | undefined, event: MouseEvent): void {
    event.stopPropagation(); // Evita que el clic active el viewProduct de la fila
    if (productId && confirm('¿Estás seguro de que quieres eliminar este producto del catálogo?')) {
      this.productsService.deleteProduct(productId).subscribe(() => {
        console.log('Producto eliminado');
        this.loadInitialData(); // Recargamos todos los datos
      });
    }
  }
  
  openFiltersSidebar(): void {
    this.sidenav.open();
  }

  exportProducts(): void {
    console.log('Exportando productos...');
  }

  applyFilters(filters: any): void {
    console.log('Filtros avanzados aplicados:', filters);
    this.sidenav.close();
  }
}