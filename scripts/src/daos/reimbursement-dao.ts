/* istanbul ignore file */
import { db } from './db';
import { Reimbursement, ReimbursementRow } from '../models/Reimbursement';

/**
 * getAllReimbursements
 * This function queries the database for all reimbursements.
 */
export function getAllReimbursements(): Promise<Reimbursement[]> {
    const sql = 'SELECT * FROM project1.ers_reimbursement';

    return db.query<ReimbursementRow>(sql, []).then(result => result.rows.map(row => row));
}

/**
 * getReimbursementsByUserID
 * This function queries the database for all reimbursements authored by specified userID.
 * @param authorID number
 */
export function getReimbursementsByUserID(authorID: number): Promise<Reimbursement[]> {
    const sql = 'SELECT reimb_id, reimb_amount, reimb_submitted, reimb_resolved, reimb_description, \
    reimb_receipt, CONCAT(a.user_first_name, \' \', a.user_last_name) AS "reimb_author", \
    CONCAT(b.user_first_name, \' \', b.user_last_name) AS "reimb_resolver", reimb_status, \
    reimb_type FROM project1.ers_reimbursement LEFT JOIN project1.ers_users AS "a" \
    ON reimb_author = a.ers_users_id LEFT JOIN project1.ers_users AS "b" ON reimb_resolver \
    = b.ers_users_id LEFT JOIN project1.ers_reimbursement_status ON ers_reimbursement.reimb_status_id \
    = ers_reimbursement_status.reimb_status_id LEFT JOIN project1.ers_reimbursement_type ON \
    ers_reimbursement.reimb_type_id = ers_reimbursement_type.reimb_type_id WHERE reimb_author = $1 \
    ORDER BY ers_reimbursement.reimb_status_id, ers_reimbursement.reimb_submitted';

    return db.query<ReimbursementRow>(sql, [authorID]).then(result => result.rows.map(row => Reimbursement.from(row)));
}

/**
 * getAllReimbursements
 * This function queries the database for all reimbursements.
 * @param statusID string
 */
export function getReimbursementsByStatusAndType(statusID, typeID): Promise<any[]> {
    let sql = 'SELECT reimb_id, reimb_amount, reimb_submitted, reimb_resolved, reimb_description, \
        reimb_receipt, CONCAT(a.user_first_name, \' \', a.user_last_name) AS "reimb_author", \
        CONCAT(b.user_first_name, \' \', b.user_last_name) AS "reimb_resolver", reimb_status, \
        reimb_type FROM project1.ers_reimbursement LEFT JOIN project1.ers_users AS "a" \
        ON reimb_author = a.ers_users_id LEFT JOIN project1.ers_users AS "b" ON reimb_resolver \
        = b.ers_users_id LEFT JOIN project1.ers_reimbursement_status ON ers_reimbursement.reimb_status_id \
        = ers_reimbursement_status.reimb_status_id LEFT JOIN project1.ers_reimbursement_type ON \
        ers_reimbursement.reimb_type_id = ers_reimbursement_type.reimb_type_id WHERE';
    if (statusID === -1) sql += ' ers_reimbursement.reimb_status_id > $1';
    else sql += ' ers_reimbursement.reimb_status_id = $1';

    if (typeID === -1) sql += ' AND ers_reimbursement.reimb_type_id > $2';
    else sql += ' AND ers_reimbursement.reimb_type_id = $2';

    sql += 'ORDER BY ers_reimbursement.reimb_status_id, ers_reimbursement.reimb_submitted';

    return db.query<ReimbursementRow>(sql, [statusID, typeID]).then(result => result.rows.map(row => Reimbursement.from(row)));
}

export function saveReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const sql = 'INSERT INTO project1.ers_reimbursement (reimb_amount, reimb_submitted, \
        reimb_description, reimb_receipt, reimb_author, reimb_status_id, reimb_type_id) \
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

    const params = [reimbursement.amount, reimbursement.dateSubmitted,
            reimbursement.description, reimbursement.receipt, reimbursement.author,
            reimbursement.status, reimbursement.type];

    return db.query<ReimbursementRow>(sql, params).then(result => result.rows.map(row => row)[0]);
}

export function updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const sql = 'UPDATE project1.ers_reimbursement SET reimb_amount = COALESCE($1, reimb_amount), \
        reimb_resolved = COALESCE($2, reimb_resolved), reimb_description = COALESCE($3, reimb_description), \
        reimb_receipt = COALESCE($4, reimb_receipt), reimb_status_id = COALESCE($5, reimb_status_id), \
        reimb_type_id = COALESCE($6, reimb_type_id) WHERE reimb_id = $7 RETURNING *';

    const params = [reimbursement.amount, reimbursement.dateResolved,
        reimbursement.description, reimbursement.receipt, reimbursement.status,
        reimbursement.type, reimbursement.id];

    return db.query<ReimbursementRow>(sql, params).then(result => result.rows.map(row => row)[0]);
}

