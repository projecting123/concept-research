import { Directive, ElementRef, inject, input, OnInit, Renderer2 } from '@angular/core';
import { FormService } from '../services/form.service';

@Directive({
  selector: '[appFocusblur]'
})
export class FocusblurDirective implements OnInit {
  fs = inject(FormService)
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement, 'focus', (event: Event) => {
      const inputEl = event.target as HTMLInputElement
      const labelEl = inputEl.nextElementSibling as HTMLLabelElement
      labelEl.classList.add('FOCUSED_OR_FILLED_LABEL')
    })

    this.renderer.listen(this.el.nativeElement, 'blur', (event: Event) => {
      const inputEl = event.target as HTMLInputElement
      const labelEl = inputEl.nextElementSibling as HTMLLabelElement
      const currentInputValue = this.fs.formData().get(inputEl.name)?.value
      if (currentInputValue == '' || currentInputValue == null) {
        labelEl.classList.remove('FOCUSED_OR_FILLED_LABEL')
      }
    })
  }
}
