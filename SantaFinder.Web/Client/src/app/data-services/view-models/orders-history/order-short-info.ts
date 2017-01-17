import { SantaShortInfo } from './santa-short-info';

export interface OrderShortInfo {
    id: number;
    datetime: string;
    address: {
        city: string;
        street: string;
        house: string;
        apartment: string;
    };
    santaInfo: SantaShortInfo;
}