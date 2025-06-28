export type Setting = {
    name: string;
    description: string;
    id: string;
    value?: boolean; // Optional, as some settings may not have a value
    disabled?: boolean; // Optional, for settings that can be toggled on/off   
}
