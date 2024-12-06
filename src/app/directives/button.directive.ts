import { Directive, ElementRef, inject, input, Renderer2, viewChild } from '@angular/core';
import { FormService } from '../services/form.service';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {
  appButton = input()
  formService = inject(FormService)
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.appButton() == 'SUBMIT_BTN') {
      this.renderer.setProperty(this.el.nativeElement, 'disabled', this.formService.isSubmitButtonDisabled())
      this.renderer.addClass(this.el.nativeElement, this.formService.isSubmitButtonDisabled() ? 'BUTTON_DISABLED' : 'BUTTON_ALLOWED')
    }

    this.renderer.listen(this.el.nativeElement, 'click', () => {
      if (this.appButton() == 'SUBMIT_BTN') {
        this.formService.submitForm()
      }
      else {
        const inputEl = this.appButton() as HTMLInputElement
        inputEl.type = inputEl.type == "password" ? "text" : "password"
      }
    })
  }
}
