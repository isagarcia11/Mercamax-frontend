import { CategoriaUbicacion } from "./categoria-ubicacion";

export interface Ubicacion {
    id?: number,
    nombre: string,
    tipo: 'BODEGA' | 'EST_BOD' | 'EST_TDA';
    categoria: number | null,
    parent: number | null
}
