import { FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from 'ng2-validators';

export default class CustomValidators {
    static password(control: FormControl): { [s: string]: boolean } {
        let isShort = Validators.minLength(5)(control);
        if (isShort) {
            return {
                password: true
            };
        }

        let hasLetter = control.value.toString().match(/[a-z]/i);
        let hasDigit = control.value.toString().match(/\d/i);

        if (hasLetter && hasDigit) {
            return null;
        } else {
            return {
                password: true
            };
        }
    }

    static notRequiredPassword(control: FormControl): { [s: string]: boolean } {
        if (control.value.length === 0) {
            return null;
        } else {
            return CustomValidators.password(control);
        }
    }

    static notRequiredPasswordWithConfirmation(passwordName: string, passwordConfirmationName: string) {
        return (control: FormControl) => {
            let password = control.get(passwordName);
            let confirmation = control.get(passwordConfirmationName);

            if (!password.value && ! confirmation.value) {
                return null;
            } else {
                return PasswordValidators
                    .mismatchedPasswords(passwordName, passwordConfirmationName)(control);
            }
        };
    }
}