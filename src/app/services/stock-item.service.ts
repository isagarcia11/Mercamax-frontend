import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockItem } from '../../app/interfaces/stock-item'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockItemService {
  
   private apiUrl = `${environment.apiUrl}/bodega/stockitems/`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los ítems de stock del inventario físico.
   * Corresponde al endpoint GET /bodega/stockitems/.
   * @returns Un Observable con la lista de StockItem.
   */
  getAll(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.apiUrl}`);
  }

  /**
   * Asigna una cantidad de un lote a un estante.
   * Corresponde al endpoint POST /bodega/stockitems/.
   * @param stockItem El objeto StockItem a crear.
   * @returns Un Observable con el ítem de stock creado.
   */
  create(stockItem: StockItem): Observable<StockItem> {
    return this.http.post<StockItem>(`${this.apiUrl}`, stockItem);
  }

  /**
   * Actualiza la cantidad de un StockItem existente.
   * Corresponde al endpoint PUT /bodega/stockitems/{id}/.
   * @param id El ID del StockItem a actualizar.
   * @param stockItem El objeto StockItem con la cantidad actualizada.
   * @returns Un Observable con el ítem de stock actualizado.
   */
  update(id: number, stockItem: StockItem): Observable<StockItem> {
    return this.http.put<StockItem>(`${this.apiUrl}${id}/`, stockItem);
  }

  /**
   * Elimina un StockItem de una ubicación.
   * Corresponde al endpoint DELETE /bodega/stockitems/{id}/.
   * @param id El ID del StockItem a remover.
   * @returns Un Observable con la respuesta de la eliminación.
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}