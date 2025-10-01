import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),

},
{
    path: 'settings',
    pathMatch: 'full',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent),
    canActivate: [authGuard]
},
{
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
},
{
    path: 'register',
    pathMatch: 'full',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
},
{
    path: 'gallery',
    pathMatch: 'full',
    loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent),
    // canActivate: [authGuard]
}
];


// Note: This file defines the routes for the application.
// next step is to create the components for the login and the registration pages.