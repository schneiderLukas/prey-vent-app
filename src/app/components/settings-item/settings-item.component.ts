import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-settings-item',
  imports: [],
  templateUrl: './settings-item.component.html',
  styleUrl: './settings-item.component.css'
})
export class SettingsItemComponent {
  name = input('Default Name');
  description = input('Default Description');
  id = input('settings-item-default-id');
}
