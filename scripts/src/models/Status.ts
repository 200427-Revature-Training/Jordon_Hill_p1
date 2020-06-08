export class Status {
    id: number;
    status: string;

    /**
     * Static function for creating a Reimbursement Status instance from the structure the
     * database gives us
     */
    static from(obj: StatusRow): Status {
        const status = new Status(
            obj.reimb_status_id, obj.reimb_status
        );
        return status;
    }

    constructor(id: number, amount: string) {
            this.id = id;
            this.status = amount;
    }
}

export interface StatusRow {
    reimb_status_id: number;
    reimb_status: string;
}