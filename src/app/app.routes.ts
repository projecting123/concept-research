import { Routes } from '@angular/router';
import { DashboardGuard, SignupOrLogin } from './route.guard';
export const routes: Routes = [
    { path: '', title: 'Home Page | Concept Research', loadComponent: () => import('./ui/home/home.component').then(m => m.HomeComponent) },
    { path: 'about', title: 'About Page | Concept Research', loadComponent: () => import('./ui/about/about.component').then(m => m.AboutComponent) },
    { path: 'signup', title: "Signup Page | Concept Research", loadComponent: () => import('./ui/form/form.component').then(m => m.FormComponent), canActivate: [SignupOrLogin] },
    { path: 'login', title: "Login Page | Concept Research", loadComponent: () => import('./ui/form/form.component').then(m => m.FormComponent), canActivate: [SignupOrLogin] },
    { path: 'dashboard', title: "Dashboard Page | Concept Research", loadComponent: () => import('./ui/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [DashboardGuard] },
    { path: 'verify-email/:userId', title: "Email Verification | Concept Research", loadComponent: () => import('./ui/verify-email/verify-email.component').then(m => m.VerifyEmailComponent) },
    { path: '**', title: 'Page not found', loadComponent: () => import('./ui/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }
];