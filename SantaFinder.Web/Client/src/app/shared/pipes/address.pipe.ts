import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '../../core/models/address.model';

@Pipe({
    name: 'address'
})
export class AddressPipe implements PipeTransform {
    transform(address: Address): string {
        return `${address.city}, ${address.house} ${address.street}, apt. ${address.apartment}`;
    }
}