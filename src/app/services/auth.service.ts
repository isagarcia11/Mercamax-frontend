import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/login/'; // CAMBIAR URL

   private apiUrl1 = 'https://tu-api.com/allauth/accounts/';


  // 1. Posible implementación para el 2FA
  activateTwoFactorAuth(): Observable<any> {
    return this.http.post(`${this.apiUrl1}2fa/authenticate/`, {});
  }

  // 2. Posible implementación para el 2FA
  verifyTwoFactorAuth(code: string): Observable<any> {
    const payload = { code: code };
    return this.http.post(`${this.apiUrl1}2fa/verify/`, payload);
  }

  // 3. Posible implementación para el 2FA
  loginWithTwoFactor(email: string, password: string, twoFactorCode?: string): Observable<any> {
    const payload = { email, password, twoFactorCode };
    return this.http.post(`${this.apiUrl1}login/`, payload);
  }

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}