import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { AboutComponent } from './ui/about/about.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { DashboardGuard, SignupOrLogin } from './route.guard';
export const routes: Routes = [
    { path: '', title: 'Home Page | Concept Research', component: HomeComponent },
    { path: 'about', title: 'About Page | Concept Research', component: AboutComponent },
    { path: 'signup', title: "Signup Page | Concept Research", loadComponent: () => import('./ui/form/form.component').then(m => m.FormComponent), canActivate: [SignupOrLogin] },
    { path: 'login', title: "Login Page | Concept Research", loadComponent: () => import('./ui/form/form.component').then(m => m.FormComponent), canActivate: [SignupOrLogin] },
    { path: 'dashboard', title: "Dashboard Page | Concept Research", loadComponent: () => import('./ui/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [DashboardGuard] },
    {path: 'verify-email/:userId', title: "Email Verification | Concept Research", loadComponent: () => import('./ui/verify-email/verify-email.component').then(m => m.VerifyEmailComponent)},
    { path: '**', title: 'Page not found', component: PageNotFoundComponent }
];