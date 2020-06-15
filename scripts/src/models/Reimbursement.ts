export class Reimbursement {
    id: number;
    amount: number;
    dateSubmitted: Date;
    dateResolved: Date;
    description: string;
    receipt: string;
    author: string | number;
    resolver: string | number;
    status: string | number;
    type: string | number;

    /**
     * Static function for creating a Reimbursement instance from the structure the
     * database gives us
     */
    static from(obj: ReimbursementRow): Reimbursement {
        const reimbursement = new Reimbursement(
            obj.reimb_id, obj.reimb_amount, obj.reimb_submitted,
                obj.reimb_resolved, obj.reimb_description,
                obj.reimb_receipt, obj.reimb_author, obj.reimb_resolver,
                obj.reimb_status, obj.reimb_type
        );
        return reimbursement;
    }

    constructor(id: number, amount: number, dateSubmitted: Date,
        dateResolved: Date, description: string, receipt: string,
        author: string | number, resolver: string | number, status: string | number,
        type: string | number) {
            this.id = id;
            this.amount = amount;
            this.dateSubmitted = dateSubmitted;
            this.dateResolved = dateResolved;
            this.description = description;
            this.receipt = receipt;
            this.author = author;
            this.resolver = resolver;
            this.status = status;
            this.type = type;
    }
}

export interface ReimbursementRow {
    reimb_id: number;
    reimb_amount: number;
    reimb_submitted: Date;
    reimb_resolved: Date;
    reimb_description: string;
    reimb_receipt: string;
    reimb_author: string;
    reimb_resolver: string;
    reimb_status: string;
    reimb_type: string;
}