import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private api: ApiService, private router: Router) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    return this.api.login<{access_token: string }>(formData).pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      })
    );
  }

  register(credentials: {username: string, password: string, confirmPassword: string}): Observable<any> {
    if (credentials.password !== credentials.confirmPassword) {
      console.error('Passwords do not match');
      return of({ error: 'Passwords do not match' });
    }

    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    return this.api.register<{access_token: string }>(formData).pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      }),
      catchError(error => {
        console.error('Registration failed', error);
        return of({ error: 'Registration failed' });
      })
    );
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
    if( typeof window !== 'undefined'){
      return localStorage.getItem('token');
    } else return null;
}

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
