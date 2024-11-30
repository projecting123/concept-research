import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { icon } from '../../animation/icon';
import { componentAnimation } from '../../animation/component';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgClass, MatIcon, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  animations: [icon, componentAnimation],

})

export class FormComponent {
  formService = inject(FormService)
  activatedRoute = inject(ActivatedRoute)
  constructor() {
    if (this.activatedRoute.snapshot.url[0].path == 'signup') {
      this.formService.formData().reset()
      this.formService.formType.set('signup')
    }
    else {
      this.formService.formData().reset()
      this.formService.formType.set('login')
    }
  }

  onFormSubmit() {
    this.formService.submitForm()
  }

  onFocus(event: any) {
    this.formService.manage_CSS_Class_For_Focus_On(event.target?.nextElementSibling)
  }

  onBlur(event: any) {
    if (event.target.value.length == 0) this.formService.manage_CSS_Class_For_Blur_On(event.target?.nextElementSibling)
  }

  isShownPassword(inputEl: HTMLInputElement) {
    this.formService.setPasswordVisibility(inputEl)
  }
}