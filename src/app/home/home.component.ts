import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeMessage = signal('Welcome to the Home Component!');

  keyUpHandler(event: KeyboardEvent) {
    console.log(`You typed ${event.key}`);
  }
}
