export class RoleRequest {
    role: string;
    action: RoleActions;
    constructor(role: string, action: RoleActions) {
        this.role = role,
        this.action = action;
    }
}

export enum RoleActions {
    Add,
    Remove
}
