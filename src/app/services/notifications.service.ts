import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/notificaciones`);
  }

  markAllAsRead(): Observable<any> {
    const body = { read: true };
    return this.http.put(`${this.apiUrl}/mark-all-as-read`, body).pipe(
      tap(() => console.log('Notificaciones marcadas como leídas en el backend'))
    );
  }
}