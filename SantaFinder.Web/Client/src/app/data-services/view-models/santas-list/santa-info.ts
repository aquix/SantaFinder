import { SantaFullInfoForClient } from '../santa-full-info/santa-full-info-for-client';

export interface SantaInfo extends SantaFullInfoForClient {
    id: number;
    email: string;
}