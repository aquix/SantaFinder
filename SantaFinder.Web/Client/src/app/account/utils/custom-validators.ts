import { FormControl, Validators } from '@angular/forms';

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
}