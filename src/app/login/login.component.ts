import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/settings']);
      },
      error: (error: any) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.')
      }
    })
  }
}
