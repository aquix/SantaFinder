import { FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from 'ng2-validators';

export default class CustomValidators {
    static password(control: FormControl): { [s: string]: boolean } {
        const isShort = Validators.minLength(5)(control);
        if (isShort) {
            return {
                password: true
            };
        }

        const hasLetter = control.value.toString().match(/[a-z]/i);
        const hasDigit = control.value.toString().match(/\d/i);

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
            const password = control.get(passwordName);
            const confirmation = control.get(passwordConfirmationName);

            if (!password.value && ! confirmation.value) {
                return null;
            } else {
                return PasswordValidators
                    .mismatchedPasswords(passwordName, passwordConfirmationName)(control);
            }
        };
    }
}
