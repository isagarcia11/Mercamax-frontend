import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces para tipar las respuestas
export interface LoginResponse {
  step?: '2fa_required';
  token?: string;
  username?: string;
  rol?: string;
  trusted?: boolean;
}

export interface TwoFactorResponse {
  token: string;
  username: string;
  rol: string;
  trusted: boolean;
}

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/login/';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials);
  }
  verifyTwoFactor(payload: { code: string; temp_token: string }): Observable<TwoFactorResponse> {
    const headers = new HttpHeaders({
      Authorization: `Token ${payload.temp_token}`
    });
    return this.http.post<TwoFactorResponse>(`http://localhost:8000/api/auth/verify-2fa/`, { code: payload.code }, { headers });
  }
}