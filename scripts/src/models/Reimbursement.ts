export class Reimbursement {
    id: number;
    amount: number;
    dateSubmitted: Date;
    dateResolved: Date;
    description: string;
    receipt: string;
    authorID: number;
    resolverID: number;
    statusID: number;
    typeID: number;

    /**
     * Static function for creating a Reimbursement instance from the structure the
     * database gives us
     */
    static from(obj: ReimbursementRow): Reimbursement {
        const reimbursement = new Reimbursement(
            obj.reimb_id, obj.reimb_amount, obj.reimb_submitted,
                obj.reimb_resolved, obj.reimb_description,
                obj.reimb_receipt, obj.reimb_author, obj.reimb_resolver,
                obj.reimb_status_id, obj.reimb_type_id
        );
        return reimbursement;
    }

    constructor(id: number, amount: number, dateSubmitted: Date,
        dateResolved: Date, description: string, receipt: string,
        authorID: number, resolverID: number, statusID: number,
        typeID: number) {
            this.id = id;
            this.amount = amount;
            this.dateSubmitted = dateSubmitted;
            this.dateResolved = dateResolved;
            this.description = description;
            this.receipt = receipt;
            this.authorID = authorID;
            this.resolverID = resolverID;
            this.statusID = statusID;
            this.typeID = typeID;
    }
}

export interface ReimbursementRow {
    reimb_id: number;
    reimb_amount: number;
    reimb_submitted: Date;
    reimb_resolved: Date;
    reimb_description: string;
    reimb_receipt: string;
    reimb_author: number;
    reimb_resolver: number;
    reimb_status_id: number;
    reimb_type_id: number;
}