import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidator {
    static name_space(control: AbstractControl): ValidationErrors | null {
        const controlValue = control.value as string
        const totalSpaces = controlValue?.split(' ').length - 1
        if (totalSpaces > 2) return { message: "Name can't contains more than two spaces" }
        return null
    }

    static validateEmail(control: AbstractControl): ValidationErrors | null {
        const controlValue = control.value as string
        const totalSpaces = controlValue?.split(' ').length - 1
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if(totalSpaces > 0) return { message: "Email can't contain any spaces" }
        if (controlValue?.length && !emailPattern.test(controlValue)) return { message : 'Enter a valid email' }
        return null;
    }

    // Checks password pattern
    static validatePassword(control: AbstractControl): ValidationErrors | null {
        const controlValue = control.value as string
        const totalSpaces = controlValue?.split(' ').length - 1
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        if(totalSpaces > 0) return {message: "Password can't contain any spaces"}
        if (controlValue?.length > 0 && !passwordPattern.test(controlValue)) return { message: "Password must contain at least one uppercase and lowercase letter, one numeric value and one special character" };
        return null
    }

    // Checked by signupForm FormGroup
    static parentValidator(control: FormGroup): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirm_password')?.value;
        if (password !== confirmPassword) return { isnotMatchedPassword: true }
        return null;
    }

    // checked by confirm password FormControl

    static mustMatch2(control: AbstractControl): ValidationErrors | null {
        const password = control.parent?.get("password")?.value
        if (password !== control.value) return { isnotMatchedPassword: true }
        return null;
    }
}