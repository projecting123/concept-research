import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from './form.service';
import { DOCUMENT } from '@angular/common';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router)
  fs = inject(FormService)
  utilService = inject(UtilityService)
  document = inject(DOCUMENT)
  isAuthorized = signal(false)
  isEmailVerified = signal(false)
  constructor(private http: HttpClient) {

  }

  signup() {
    if (!navigator.onLine) return this.utilService.openSnackBar('Internet not available.')
    const res = this.http.post('http://localhost:4000/auth/signup', { name: this.fs.formData().get('name')?.value, email: this.fs.formData().get('email')?.value, password: this.fs.formData().get('password')?.value }, { withCredentials: true })
    res.subscribe((res: any) => {
      this.fs.formData().reset()
      this.fs.removeFocusClasses()
      this.utilService.openSnackBar(res.message)
    })
  }

  // frontend tells backend, "I'll accept cookies or any such info from you" by withCredentials property in Angular.
  login() {
    if (!navigator.onLine) return this.utilService.openSnackBar('Internet not available.')
    const res = this.http.post('http://localhost:4000/auth/login', { email: this.fs.formData().get('email')?.value, password: this.fs.formData().get('password')?.value }, { withCredentials: true })
    res.subscribe((res: any) => {
      if (res.isLoggedIn) {
        this.isAuthorized.set(true)
        localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
        this.router.navigate(['dashboard'])
      }
      else {
        this.utilService.openSnackBar('Login Failed')
        this.fs.formData().reset()
        this.fs.removeFocusClasses()
      }
    })
  }

  logout() {
    const response = this.http.get('http://localhost:4000/auth/logout', { withCredentials: true })
    response.subscribe(() => {
      this.removeUserInfo()
      this.isAuthorized.set(false)
      this.router.navigate(['/login'])
    })
  }

  verifyEmail(userId: string) {
    return this.http.post('http://localhost:4000/auth/send-email', { userId: userId }, { withCredentials: true })
  }

  sendVerificationEmail(email: string) {
    return this.http.post('http://localhost:4000/auth/send-verification-email', { email: email }, { withCredentials: true })
  }

  getUserInfo() {
    if (this.document.cookie.split('=')[0]) return JSON.parse(localStorage.getItem('userInfo')!)
    return null
  }


  removeUserInfo() {
    if (!this.document.cookie.split('=')[0]) localStorage.removeItem('userInfo')
  }
}