import { inject, Injectable } from '@angular/core';
import { Setting } from '../models/settings.type';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private api: ApiService) {}

  http = inject(HttpClient);

  private settingsItems: Array<Setting> = [{
    name: 'Enable Cascade',
    description: 'Enbale automatic prey detection system inlcuding flap lock',
    id: 'cascade-setting-id',
    value: true, // Optional, can be omitted if not needed
    disabled: false // Optional, can be omitted if not needed
  },{
    name: 'Lock Inside Direction',
    description: 'Lock the flap to secure no animal is coming in your house',
    id: 'lock-inside-setting-id',
    value: false, // Optional, can be omitted if not needed
    disabled: false // Optional, can be omitted if not needed
  },{
    name: 'Lock Outside Direction',
    description: 'Lock the flap to secure no animal is going out of your house',
    id: 'lock-outside-setting-id',
    value: false, // Optional, can be omitted if not needed
    disabled: false
  }]

  getSettings(): Array<Setting> {
    // This method can be used to fetch settings from a server if needed
    // For now, we return the static settingsItems array
    return this.settingsItems;
  }
  toggleSetting(id: string): void {
    console.log(`Toggling setting with id: ${id}`);
    const setting = this.settingsItems.find(s => s.id === id);
    if (!setting) {
      console.error(`Setting with id ${id} not found`);
      return;
    }

    const formData = new FormData();
    formData.append('id', id);

    this.api.post("toggle", formData).subscribe({
      next: (response) => {
        console.log(`Setting ${id} toggled successfully:`, response);
        setting.value = (response as {value: boolean}).value; // Assuming the response contains the updated value
        console.log(`Updated setting value: ${setting.value}`);
      }
    });
  }

}
