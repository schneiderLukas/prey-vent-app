import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService, private router: Router) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    return this.api.post('login', credentials);
  }

  register(data: {username: string, password: string}): Observable<any> {
    return this.api.post('register', data);
  }

  verifyToken(): Observable<any> {
    const token = this.getToken();
    if (!token) return of(false);

    return this.api.get<any>('verify-token').pipe(
      map(() => true),
      catchError(() => of(false)))
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
