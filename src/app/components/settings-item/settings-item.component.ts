import { Component, input, signal } from '@angular/core';
import { Setting } from '../../models/settings.type';

@Component({
  selector: 'app-settings-item',
  imports: [],
  templateUrl: './settings-item.component.html',
  styleUrl: './settings-item.component.css'
})
export class SettingsItemComponent {
  setting = input<Setting>();
}
