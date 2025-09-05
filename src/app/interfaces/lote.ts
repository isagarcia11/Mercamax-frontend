import { Product } from "./productos";

export interface Lote {
    id?:number,
    producto: number,
    codigo_lote:string,
    fecha_caducidad: string,
    //fecha_recepcion: Date,
    costo_compra_lote: number
}
