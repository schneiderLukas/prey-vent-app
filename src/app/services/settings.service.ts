import { inject, Injectable } from '@angular/core';
import { Setting } from '../models/settings.type';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private api: ApiService) { }

  http = inject(HttpClient);

  private settingsItems: Array<Setting> = [{
    name: 'Enable Cascade',
    description: 'Enbale automatic prey detection system inlcuding flap lock',
    id: 'cascade-setting-id',
    value: false, // Optional, can be omitted if not needed
    disabled: false // Optional, can be omitted if not needed
  }, {
    name: 'Lock Inside Direction',
    description: 'Lock the flap to secure no animal is coming in your house',
    id: 'lock-inside-setting-id',
    disabled: false // Optional, can be omitted if not needed
  }, {
    name: 'Lock Outside Direction',
    description: 'Lock the flap to secure no animal is going out of your house',
    id: 'lock-outside-setting-id',
    disabled: false
  }]

  getSettings(): Array<Setting> {
    this.api.get("door-state").subscribe({
      next: (response) => {
        const inwardLocked = (response as { inward_locked: boolean }).inward_locked;
        const outwardLocked = (response as { outward_locked: boolean }).outward_locked;

        this.settingsItems.forEach(setting => {
          if (setting.id === 'lock-inside-setting-id') {
            setting.value = inwardLocked;
          } else if (setting.id === 'lock-outside-setting-id') {
            setting.value = outwardLocked;
          }
        });
      }
    })

    this.api.get("inference-state").subscribe({
      next: (response) => {
        const cascadeEnabled = (response as { inference_running: boolean }).inference_running;
        this.settingsItems.forEach(setting => {
          if (setting.id === 'cascade-setting-id') {
            setting.value = cascadeEnabled;
          }
          this.toggleDoorButtons();
        });
      }
    });



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
        setting.value = (response as { value: boolean }).value; // Assuming the response contains the updated value
        console.log(`Updated setting value: ${setting.value}`);

        this.getSettings(); // Refresh settings after toggling
        this.toggleDoorButtons();
      }
    });
  }

  toggleDoorButtons(): void {
    const cascadeSetting = this.settingsItems.find(s => s.id === 'cascade-setting-id');
    if (!cascadeSetting) {
      console.error('Cascade setting not found');
      return;
    }

    this.settingsItems.find(s => s.id === 'lock-inside-setting-id')!.disabled = cascadeSetting.value;
    this.settingsItems.find(s => s.id === 'lock-outside-setting-id')!.disabled = cascadeSetting.value;

  }

}
