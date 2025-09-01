// src/app/products/products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/productos';
import { CategoriaDropdown } from '../../interfaces/categoria-dropdown';
import { CategoriaProducto } from '../../interfaces/categoria-producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://tu-api.com/api/products';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<CategoriaDropdown[]> {
    return this.http.get<CategoriaProducto[]>(this.apiUrl).pipe(
      map(categorias => categorias.map(categoria => ({
        value: categoria.id,
        viewValue: categoria.nombre
      })))
    );
  }

  // C - Create (Crear un nuevo producto)
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // R - Read (Leer todos los productos)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  // R - Read (Leer un solo producto por ID)
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}/`);
  }

  // U - Update (Actualizar un producto existente)
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}/`, product);
  }

  // D - Delete (Borrar un producto)
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}