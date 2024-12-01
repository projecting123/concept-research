import { computed, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  snackbar = inject(MatSnackBar)
  authService = inject(AuthService)
  router = inject(Router)
  constructor() {
    this.formData().statusChanges.subscribe((status: any) => {
      this.formStatus.set(status)
    })
  }

  formType = signal<'signup' | 'login'>('signup')
  formData = computed<FormGroup>(() => this.formType() == 'signup' ? this.signupFormData : this.loginFormData)
  isProgressingSignupOrLogin = signal(false)
  formStatus = signal<'INVALID' | 'VALID'>('INVALID')
  isSubmitButtonDisabled = computed(() => {
    if (this.formStatus() === 'VALID') return this.isProgressingSignupOrLogin()
    return true
  })

  signupFormData = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, CustomValidator.validateEmail]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), CustomValidator.validatePassword]),
    confirm_password: new FormControl("", [Validators.required, Validators.minLength(6), CustomValidator.validatePassword, CustomValidator.mustMatch2])
  }, { validators: CustomValidator.mustMatch })

  loginFormData = new FormGroup({
    email: new FormControl('', [Validators.required, CustomValidator.validateEmail]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), CustomValidator.validatePassword])
  })

  onFocus(event: Event) {
    const inputEl = event.target as HTMLInputElement
    const labelEl = inputEl.nextElementSibling as HTMLLabelElement
    labelEl.classList.add('FOCUSED_OR_FILLED_LABEL')
  }

  onBlur(event: Event) {
    const inputEl = event.target as HTMLInputElement
    const labelEl = inputEl.nextElementSibling as HTMLLabelElement
    if(this.formData().get(inputEl.name)?.value?.length == null){
      labelEl.classList.remove('FOCUSED_OR_FILLED_LABEL')
    }
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "Ok", { duration: 2000 })
  }

  setPasswordVisibility(inputEl: HTMLInputElement) {
    inputEl.type = inputEl.type == "password" ? "text" : "password"
  }

  submitForm() {
    const formData = this.formData()
    this.isProgressingSignupOrLogin.set(true)
    if (this.formType() == 'signup') {
      const res = this.authService.signup({ name: formData.get('name')?.value, email: formData.get('email')?.value, password: formData.get('password')?.value })
      res.subscribe((signupResponse: any) => {
        formData.reset()
        this.isProgressingSignupOrLogin.set(false)
        this.openSnackbar(signupResponse.message)
      })
    }
    else if (this.formType() == 'login') {
      this.authService.login({ email: formData.get('email')?.value, password: formData.get('password')?.value }).subscribe((loginResponse: LoginResponse) => {
        if (loginResponse.statusCode == 401 || loginResponse.statusCode == 500) {
          formData.reset()
          this.isProgressingSignupOrLogin.set(false)
          this.openSnackbar(loginResponse.message)
        }
        else {
          this.authService.setUserInfo(loginResponse.userInfo)
          this.authService.setisAuthorized(true)
          this.router.navigate(['/dashboard'])
        }
      })
    }
  }
}
