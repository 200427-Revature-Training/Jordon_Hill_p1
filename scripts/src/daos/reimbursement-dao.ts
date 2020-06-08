/* istanbul ignore file */
import { db } from './db';
import { Reimbursement, ReimbursementRow } from '../models/Reimbursement';

/**
 * getAllReimbursements
 * This function queries the database for all reimbursements.
 */
export function getAllReimbursements(): Promise<Reimbursement[]> {
    const sql = 'SELECT * FROM project1.ers_reimbursement';

    return db.query<ReimbursementRow>(sql, []).then(result => result.rows.map(row => Reimbursement.from(row)));
}

/**
 * getReimbursementsByUserID
 * This function queries the database for all reimbursements authored by specified userID.
 * @param authorID number
 */
export function getReimbursementsByUserID(authorID: number): Promise<Reimbursement[]> {
    const sql = 'SELECT * FROM project1.ers_reimbursement WHERE reimb_author = $1';

    return db.query<ReimbursementRow>(sql, [authorID]).then(result => result.rows.map(row => Reimbursement.from(row)));
}

/**
 * getAllReimbursements
 * This function queries the database for all reimbursements.
 * @param statusID string
 */
export function getReimbursementsByStatus(statusID): Promise<Reimbursement[]> {
    const sql = 'SELECT * FROM project1.ers_reimbursement WHERE reimb_status_id = $1';

    return db.query<ReimbursementRow>(sql, [statusID]).then(result => result.rows.map(row => Reimbursement.from(row)));
}

export function saveReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const sql = 'INSERT INTO project1.ers_users (reimb_amount, reimb_submitted, \
        reimb_description, reimb_receipt, reimb_author, reimb_status_id, reimb_type_id) \
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

    const params = [reimbursement.amount, reimbursement.dateSubmitted,
            reimbursement.description, reimbursement.receipt, reimbursement.authorID,
            reimbursement.statusID, reimbursement.typeID];

    return db.query<ReimbursementRow>(sql, params).then(result => result.rows.map(
            row => Reimbursement.from(row))[0]);
}

export function updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const sql = 'UPDATE project1.ers_reimbursement SET reimb_amount = COALESCE($1, reimb_amount), \
        reimb_resolved = COALESCE($2, reimb_resolved), reimb_description = COALESCE($3, reimb_description), \
        reimb_receipt = COALESCE($4, reimb_receipt), reimb_status_id = COALESCE($5, reimb_status_id), \
        reimb_type_id = COALESCE($6, reimb_type_id) WHERE reimb_id = $7 RETURNING *';

    const params = [reimbursement.amount, reimbursement.dateResolved,
        reimbursement.description, reimbursement.receipt, reimbursement.statusID,
        reimbursement.typeID, reimbursement.id];

    return db.query<ReimbursementRow>(sql, params).then(result => result.rows.map(row => Reimbursement.from(row))[0]);
}

