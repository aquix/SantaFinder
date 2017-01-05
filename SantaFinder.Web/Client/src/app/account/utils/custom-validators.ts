import { FormControl, FormGroup, Validators } from '@angular/forms';

export default class CustomValidators {
    static password(control: FormControl): { [s: string]: boolean } {
        let isEmptyOrShort = Validators.required(control) || Validators.minLength(5)(control);
        if (isEmptyOrShort) {
            return isEmptyOrShort;
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

    static passwordsEqual(group: FormGroup) {
        let password = group.controls['password'].value;
        let passwordConfirmation = group.controls['passwordConfirmation'].value;

        if (passwordConfirmation === password) {
            return null;
        } else {
            return {
                passwordsEqual: true
            };
        }
    }
}