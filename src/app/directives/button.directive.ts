import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { FormService } from '../services/form.service';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {
  appButton = input()
  auth = inject(AuthService)
  fs = inject(FormService)
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.appButton() == 'SUBMIT_BTN') {
      this.renderer.setProperty(this.el.nativeElement, 'disabled', this.fs.formData().invalid)
      this.renderer.addClass(this.el.nativeElement, this.fs.formData().invalid ? 'BUTTON_DISABLED' : 'BUTTON_ALLOWED')
      this.fs.formData().statusChanges.subscribe(newStatus => {
        this.renderer.setProperty(this.el.nativeElement, 'disabled', newStatus == 'INVALID' ? true : false)
        this.renderer.removeClass(this.el.nativeElement, newStatus == 'INVALID' ? 'BUTTON_ALLOWED' : 'BUTTON_DISABLED')
        this.renderer.addClass(this.el.nativeElement, newStatus == 'INVALID' ? 'BUTTON_DISABLED' : 'BUTTON_ALLOWED')
      })
    }

    this.renderer.listen(this.el.nativeElement, 'click', () => {
      if (this.appButton() == 'SUBMIT_BTN') {
        this.fs.formType() == 'signup' ? this.auth.signup() : this.auth.login()
      }
      else {
        const inputEl = this.appButton() as HTMLInputElement
        inputEl.type = inputEl.type == "password" ? "text" : "password"
      }
    })
  }
}
