import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lote } from '../../app/interfaces/lote';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private apiUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los lotes del backend.
   * Corresponde al endpoint GET /bodega/lotes/.
   * @returns Un Observable con la lista de lotes.
   */
  getAll(): Observable<Lote[]> {
    return this.http.get<Lote[]>(environment.apiUrl);
  }

  /**
   * Crea un nuevo lote.
   * Corresponde al endpoint POST /bodega/lotes/.
   * @param lote El objeto Lote a crear.
   * @returns Un Observable con el lote creado.
   */
  create(lote: Lote): Observable<Lote> {
    return this.http.post<Lote>(environment.apiUrl, lote);
  }

  /**
   * Actualiza un lote existente.
   * Corresponde al endpoint PUT /bodega/lotes/{id}/.
   * @param id El ID del lote a actualizar.
   * @param lote El objeto Lote con los datos actualizados.
   * @returns Un Observable con el lote actualizado.
   */
  update(id: number, lote: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${environment.apiUrl}${id}/`, lote);
  }

  /**
   * Elimina un lote por su ID.
   * Corresponde al endpoint DELETE /bodega/lotes/{id}/.
   * @param id El ID del lote a eliminar.
   * @returns Un Observable con la respuesta de la eliminación.
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${id}/`);
  }
}