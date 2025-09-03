import { Lote } from "./lote";
import { Ubicacion } from "./ubicacion";

export interface StockItem {
    id?:number,
    lote: Lote,
    ubicacion: Ubicacion,
    cantidad: number
}
