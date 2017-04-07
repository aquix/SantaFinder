import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment/moment';

@Pipe({
    name: 'datetime'
})
export class DatetimePipe implements PipeTransform {
    transform(datetime: Date): string {
        return moment(datetime).format('LLL');
    }
}
