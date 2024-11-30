import { animate, style, transition, trigger } from "@angular/animations";

export const icon = trigger('icon', [
    transition(":enter", [style({ opacity: 0 }), animate("0.3s ease-in-out")]),
    transition(":leave", [animate("0.3s ease-in-out", style({ opacity: 0 }))])
])