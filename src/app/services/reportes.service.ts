import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RotacionInventario } from '../../app/interfaces/rotacion-inventario';
import { ResumenStock } from '../../app/interfaces/resumen-stock';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getValuacionInventario(): Observable<ResumenStock> {
    return this.http.get<ResumenStock>(`${environment.apiUrl}/bodega/reports/stock-valuation/`);
  }

  getRotacionInventario(): Observable<RotacionInventario> {
    return this.http.get<RotacionInventario>(`${environment.apiUrl}/bodega/reports/inventory-turnover/`);
}
}