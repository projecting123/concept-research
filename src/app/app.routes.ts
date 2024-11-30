import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { AboutComponent } from './ui/about/about.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { DashboardGuard, SignupOrLogin } from './route.guard';
import { FormComponent } from './ui/form/form.component';
import { VerifyEmailComponent } from './ui/verify-email/verify-email.component';

export const routes: Routes = [
    { path: '', title: 'Home Page | Concept Research', component: HomeComponent },
    { path: 'about', title: 'About Page | Concept Research', component: AboutComponent },
    { path: 'signup', title: "Signup Page | Concept Research", component: FormComponent, canActivate: [SignupOrLogin] },
    { path: 'login', title: "Login Page | Concept Research", component: FormComponent, canActivate: [SignupOrLogin] },
    { path: 'dashboard', title: "Dashboard Page | Concept Research", component: DashboardComponent, canActivate: [DashboardGuard] },
    {path: 'verify-email/:userId', title: "Email Verification | Concept Research", component: VerifyEmailComponent},
    { path: '**', title: 'Page not found', component: PageNotFoundComponent }
];