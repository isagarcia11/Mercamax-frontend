// src/app/services/products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../app/interfaces/productos';
import { CategoriaProducto } from '../../app/interfaces/categoria-producto';
import { Proveedor } from '../../app/interfaces/proveedor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // --- URLs Base Corregidas ---
   private apiUrl = 'http://127.0.0.1:8000/api/productos';

   constructor(private http: HttpClient) { }


  // --- MÉTODOS CRUD PARA PRODUCTOS ---
  createProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/productos/`, productData);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/productos/`);
  }
  
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/productos/${id}/`);
  }

  updateProduct(id: number, productData: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/productos/${id}/`, productData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/productos/${id}/`);
  }

  // --- MÉTODOS PARA DATOS AUXILIARES ---
  getCategories(): Observable<CategoriaProducto[]> {
    return this.http.get<CategoriaProducto[]>(`${this.apiUrl}/categorias-producto/`);
  }

  getProveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/proveedores/`);
  }

  // --- MÉTODOS PARA REPORTES Y ANÁLISIS ---
  getStockDetails(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/${id}/stock-details/`);
  }

  getStockValuationReport(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/bodega/reports/stock-valuation/`);
  }

  getEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas/`);
  }
}