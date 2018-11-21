export interface Notification {
    action?: string;
    message: string;
    type: 'success' | 'warning' | 'fail';
}
