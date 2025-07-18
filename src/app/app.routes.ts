import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
},
{
    path: 'settings',
    pathMatch: 'full',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
},
{
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
}
];


// Note: This file defines the routes for the application.
// next step is to create the components for the login and the registration pages.