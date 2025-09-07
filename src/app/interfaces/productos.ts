import { CategoriaProducto } from "./categoria-producto";
import { Proveedor } from "./proveedor";

// src/app/products/product.interface.ts
export interface Product {
  id?: number; 
  nombre: string;
  codigo_barras: string;
  categoria: CategoriaProducto | null;
  categoria_nombre: CategoriaProducto | null;
  descripcion: string;
  precio_venta: number;
  precio_compra: number;
  stock: number;
  stock_minimo: number;
  proveedor: Proveedor | null;
}