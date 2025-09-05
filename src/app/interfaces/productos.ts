import { CategoriaProducto } from "./categoria-producto";
import { Proveedor } from "./proveedor";

// src/app/products/product.interface.ts
export interface Product {
  id?: number; 
  nombre: string;
  codigo_barras: string;
  categoria: CategoriaProducto | null;
  descripcion: string;
  precio_venta: number | null;
  precio_compra: number | null;
  stock_total: number | null;
  stock_minimo: number | null;
  punto_reorden: number | null;
  proveedor: Proveedor | null;
}