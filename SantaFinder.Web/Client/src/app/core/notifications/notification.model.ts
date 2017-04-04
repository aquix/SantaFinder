import { NotificationType } from './notification-type.enum';

export interface NotificationViewModel {
    type: NotificationType;
    content: string;
}