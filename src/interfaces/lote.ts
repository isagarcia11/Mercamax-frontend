import { Product } from "./productos";

export interface Lote {
    id?:number,
    producto: Product,
    codigo_lote:string,
    fecha_caducidad: Date,
    fecha_recepcion: Date,
    costo_compra_lote: number
}
