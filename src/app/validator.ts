import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {
    // Checks email pattern
    static validateEmail(control: AbstractControl): ValidationErrors | null {
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(control.value)) return { invalidEmail: true }
        return null;
    }
    
    // Checks password pattern
    static validatePassword(control: AbstractControl): ValidationErrors | null {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        if (!passwordPattern.test(control.value)) return { invalidPassword: true };
        return null
    }

    // Checked by signupForm FormGroup
    static mustMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirm_password')?.value;
        if (password !== confirmPassword) return { isnotMatchedPassword: true }
        return null;
    }

    // checked by confirm password FormControl

    static mustMatch2(control: AbstractControl): ValidationErrors | null {
        const password = control.parent?.get("password")?.value
        if(password !== control.value) return { isnotMatchedPassword: true }
        return null;
    }
}