import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development'; // Adjust the import based on your environment setup

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(token?: string): HttpHeaders {
    const jwt = token || localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': jwt ? `Bearer ${jwt}` : '',
      'Content-Type': 'application/json'
    });

  } 

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${endpoint}`, {
      headers: this.getAuthHeaders()});
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.url}/${endpoint}`, body, {
      headers: this.getAuthHeaders()});
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.url}/${endpoint}`, body, {
      headers: this.getAuthHeaders()});
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.url}/${endpoint}`, {
      headers: this.getAuthHeaders()});
  }

  login<T>(formData: FormData): Observable<T> {
    return this.http.post<T>(`${this.url}/login`, formData, {
      
    });
  }
  
}
