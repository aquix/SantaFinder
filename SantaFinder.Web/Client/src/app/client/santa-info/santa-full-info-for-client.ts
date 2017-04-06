import { FeedbackItem } from './feedback-item';

export interface SantaFullInfoForClient {
    name: string;
    photoUrl: string;
    rating: number;
    numberOfOrders: number;
    feedbacks: FeedbackItem[];
}