export class Role {
    id: number;
    role: string;

    /**
     * Static function for creating a Reimbursement Role instance from the structure the
     * database gives us
     */
    static from(obj: RoleRow): Role {
        const role = new Role(
            obj.reimb_role_id, obj.reimb_role
        );
        return role;
    }

    constructor(id: number, role: string) {
            this.id = id;
            this.role = role;
    }
}

export interface RoleRow {
    reimb_role_id: number;
    reimb_role: string;
}