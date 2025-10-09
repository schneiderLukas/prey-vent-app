import { Component } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface NetworkInfo {
  ssid: string;
  signal: number;
  secure: boolean;
}

@Component({
  selector: 'app-network',
  imports: [FormsModule, CommonModule],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css'
})
export class NetworkComponent {
  availableNetworks: NetworkInfo[] = [];
  selectedSSID: string = '';
  password: string = '';
  loading: boolean = false;
  message: string = '';

  constructor(private networkService: NetworkService, private router: Router) { }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.loadNetworks();
    }
  }

  loadNetworks() {
    this.loading = true;
    this.networkService.getAvailableNetworks().subscribe({
      next: (networks) => {
        this.availableNetworks = networks;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message = 'Failed to load networks';
      }
    });
  }

  connect() {
    if (!this.selectedSSID) {
      this.message = 'Please select a network';
      return;
    }

    this.loading = true;
    this.message = '';

    this.networkService.connectToWifi({
      ssid: this.selectedSSID,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.message = response.message || (response.success ? 'Connected!' : 'Failed to connect');
        if (response.success) {
          // Navigate after a short delay
          setTimeout(() => this.router.navigate(['/settings']), 1000);
        }
      },
      error: () => {
        this.loading = false;
        this.message = 'Connection failed';
      }
    });
  }

  isPasswordRequired(): boolean {
    const net = this.availableNetworks.find(n => n.ssid === this.selectedSSID);
    return net ? net.secure : false;
  }
}
