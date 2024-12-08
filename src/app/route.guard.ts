import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, } from '@angular/router';
import { AuthService } from './services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const DashboardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const auth = inject(AuthService)
  const platformId = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformId)) {
    if (auth.isAuthorized()) return true
    auth.removeUserInfo()
    auth.isAuthorized.set(false)
    router.navigate(['/login']);
    return false;
  }
  return false
}

export const SignupOrLogin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const auth = inject(AuthService)
  const platformId = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformId)) {
    if (auth.isAuthorized()) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
  return false
}