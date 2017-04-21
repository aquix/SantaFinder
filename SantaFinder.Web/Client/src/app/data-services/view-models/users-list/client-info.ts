export interface ClientInfo {
    id: string;
    email: string;
    name: string;
    address: {
        city: string;
        street: string;
        house: string;
        apartment: string;
    };
}