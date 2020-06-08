export class Type {
    id: number;
    type: string;

    /**
     * Static function for creating a Reimbursement Type instance from the structure the
     * database gives us
     */
    static from(obj: TypeRow): Type {
        const type = new Type(
            obj.reimb_type_id, obj.reimb_type
        );
        return type;
    }

    constructor(id: number, type: string) {
            this.id = id;
            this.type = type;
    }
}

export interface TypeRow {
    reimb_type_id: number;
    reimb_type: string;
}