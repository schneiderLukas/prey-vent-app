import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({username: this.username, password: this.password, confirmPassword: this.confirmPassword}).subscribe(
      {
        next: (response: any) => {
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            this.router.navigate(['/settings']);
          } else {
            alert('Registration failed. Please try again.');
          }
        },
        error: (error: any) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please check your details and try again.');
        }
      }
    )
  }

}
