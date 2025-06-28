import { Setting } from '../models/settings.type';

export class SettingsService {

  settingsItems: Array<Setting> = [{
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
    disabled: true // Optional, can be omitted if not needed
  },{
    name: 'Lock Outside Direction',
    description: 'Lock the flap to secure no animal is going out of your house',
    id: 'lock-outside-setting-id',
    value: false, // Optional, can be omitted if not needed
    disabled: true
  }]

  constructor() { }
}
