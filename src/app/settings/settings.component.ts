import { Component, inject, OnInit, signal } from '@angular/core';
import { SettingsItemComponent } from "../components/settings-item/settings-item.component";
import { SettingsService } from '../services/settings.service';
import { Setting } from '../models/settings.type';

@Component({
  selector: 'app-settings',
  imports: [SettingsItemComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers: [SettingsService]
  
})
export class SettingsComponent implements OnInit {
    settingsService = inject(SettingsService);
    settingsItems = signal<Array<Setting>>([]);

  ngOnInit(): void {
    this.settingsItems.set(this.settingsService.getSettings());
  }
  toggleSetting(id: string): void {
    this.settingsService.toggleSetting(id);
    //this.settingsItems.set(this.settingsService.getSettings());
  }
}
