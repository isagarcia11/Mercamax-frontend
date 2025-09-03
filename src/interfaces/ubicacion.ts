import { CategoriaUbicacion } from "./categoria-ubicacion";

export interface Ubicacion {
    id?: number,
    nombre: string,
    tipo: string,
    categoria: CategoriaUbicacion,
    parent: Ubicacion
}
