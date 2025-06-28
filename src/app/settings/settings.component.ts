import { Component } from '@angular/core';
import { SettingsItemComponent } from "../components/settings-item/settings-item.component";

@Component({
  selector: 'app-settings',
  imports: [SettingsItemComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
