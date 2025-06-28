import { Component, signal } from '@angular/core';
import { SettingsComponent } from "../components/settings/settings.component";

@Component({
  selector: 'app-home',
  imports: [SettingsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeMessage = signal('Welcome to the Home Component!');
}
