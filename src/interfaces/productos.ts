// src/app/products/product.interface.ts
export interface Product {
  id?: number; 
  nombre: string;
  codigo_barras: string;
  categoria: string;
  descripcion: string;
  precio_venta: number | null;
  precio_compra: number | null;
  stock: number | null;
  punto_reorden: number | null;
  proveedor: string;
}