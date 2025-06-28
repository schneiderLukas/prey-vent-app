export type Setting = {
    name: string;
    description: string;
    id: string;
    value?: boolean; // Optional, as some settings may not have a value   
}