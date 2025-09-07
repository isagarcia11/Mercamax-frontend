import { Product } from "./productos";

export interface Lote {
    id?:number,
    producto: number,
    codigo_lote:string,
    fecha_caducidad?: string,
    costo_compra_lote?: number
}
