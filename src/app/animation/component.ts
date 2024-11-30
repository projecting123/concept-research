import { animate, style, transition, trigger } from "@angular/animations";

export const componentAnimation =  trigger('componentAnimation', [
    transition(":enter", [style({opacity: 0, transform: 'scale(0.75)'}), animate("0.2s ease-in-out")])
])