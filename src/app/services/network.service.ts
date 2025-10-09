import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable, of } from 'rxjs';

interface NetworkInfo {
  ssid: string;
  signal: number;
  secure: boolean;
}
interface Credentials {
  ssid: string;
  password: string;
}
interface ConnectResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private api: ApiService) { }

  getAvailableNetworks() {
    return this.api.get<{ availableNetworks: NetworkInfo[] }>('wifi-networks').pipe(
      catchError(err => {
        console.error('Error fetching networks', err);
        return of({ availableNetworks: [] });
      }),
      map(response => response.availableNetworks)
    );
  }
  connectToWifi(Credentials: Credentials): Observable<ConnectResponse> {
    const formData = new FormData();
    formData.append('ssid', Credentials.ssid);
    formData.append('password', Credentials.password);
    return new Observable<ConnectResponse>((observer) => {
      this.api.post<ConnectResponse>('wifi-connect', formData).subscribe({
        next: (response) => {
          const connectResponse: ConnectResponse = {
            success: response.success,
            message: "Connected successfully"
          };
          observer.next(connectResponse);
          observer.complete();
        },
        error: () => {
          const connectResponse: ConnectResponse = {
            success: false,
            message: "Failed to connect"
          };
          observer.next(connectResponse);
          observer.complete();
        }
      });
    });
  }
}
