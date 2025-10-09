import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, of } from 'rxjs';

interface NetworkInfo {
  ssid: string;
  signal: number;
  secure: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private api: ApiService) { }

  getAvailableNetworks() {
    return this.api.get<{ availableNetworks: NetworkInfo[]}>('wifi-networks').pipe(
      catchError(err => {
        console.error('Error fetching networks', err);
        return of({ availableNetworks: [] });
    }),
    map(response => response.availableNetworks)
  );
  }
}
