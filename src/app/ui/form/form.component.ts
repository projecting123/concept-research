import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { icon } from '../../animation/icon';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';
import { FocusblurDirective } from '../../directives/focusblur.directive';
import { ButtonDirective } from '../../directives/button.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, MatIcon, NgIf, FocusblurDirective, ButtonDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  animations: [icon],
})

export class FormComponent {
  fs = inject(FormService)
  activeRoute = inject(ActivatedRoute)
  constructor() {
    if (this.activeRoute.snapshot.url[0].path == 'signup') {
      this.fs.formData().reset()
      this.fs.formType.set('signup')
    }
    else if (this.activeRoute.snapshot.url[0].path == 'login') {
      this.fs.formData().reset()
      this.fs.formType.set('login')
    }
  }
}