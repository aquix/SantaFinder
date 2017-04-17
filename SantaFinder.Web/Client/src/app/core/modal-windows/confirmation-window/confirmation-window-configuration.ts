export interface ConfirmationWindowConfiguration {
    text: string;
    okText?: string;
    cancelText?: string;
    ok: (() => void);
    cancel?: (() => void);
}
