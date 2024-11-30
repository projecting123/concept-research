import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, } from '@angular/router';
import { AuthService } from './services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const DashboardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  const platformId = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformId)) {
    if (authService.getUserInfo()) {
      authService.setisAuthorized(true)
      return true
    }
    authService.removeUserInfo()
    authService.setisAuthorized(false)
    router.navigate(['/login']);
    return false;
  }
  return false
}

export const SignupOrLogin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  const platformId = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformId)) {
    if (authService.getUserInfo()) {
      router.navigate(['/dashboard']);
      return false;
    }
    authService.removeUserInfo()
    authService.setisAuthorized(false)
    return true;
  }
  return false
}