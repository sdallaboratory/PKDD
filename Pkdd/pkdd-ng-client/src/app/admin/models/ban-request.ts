export class BanRequest {
    action: BanActions;
    constructor(action: BanActions) {
        this.action = action;
    }
}

export enum BanActions {
    Ban,
    Unban
}
