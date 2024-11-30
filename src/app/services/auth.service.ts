import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized = signal(false)
  isVerificationMailSent = signal<boolean>(false)
  isEmailVerified = signal<boolean>(false)
  LoggedInUserData!: UserInfo | null
  loggedInEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(private http: HttpClient) {

  }

  signup(user: object): Observable<any> {
    return this.http.post('http://localhost:4000/auth/signup', user)
  }

  // frontend tells backend, "I'll accept cookies or any such info from you" by withCredentials property in Angular.
  login(user: object): Observable<any> {
    return this.http.post('http://localhost:4000/auth/login', user, { withCredentials: true })
  }

  logout(): Observable<any> {
    return this.http.get('http://localhost:4000/auth/logout', { withCredentials: true })
  }

  verifyEmail(userId: string){
    return this.http.post('http://localhost:4000/auth/send-email', {userId: userId}, {withCredentials: true})
  }

  sendVerificationEmail(email: string){
    return this.http.post('http://localhost:4000/auth/send-verification-email', {email: email}, {withCredentials: true})
  }

  getUserInfo() {
    if (document.cookie.split('=')[0]) {
      const LoggedInUserData = JSON.parse(localStorage.getItem('userInfo')!)
      return LoggedInUserData
    }
    return null
  }

  setUserInfo(data: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  removeUserInfo() {
    if (!document.cookie.split('=')[0]) {
      localStorage.removeItem('userInfo')
      this.LoggedInUserData = null
    }
  }

  setisAuthorized(isAuthorized: boolean) {
    this.isAuthorized.set(isAuthorized)
  }
}