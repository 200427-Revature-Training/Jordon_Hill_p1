/* istanbul ignore file */
import { db } from './db';
import { Status, StatusRow } from '../models/Status';

/**
 * getAllStatus
 * This function queries the database for all status.
 */
export function getAllStatus(): Promise<Status[]> {
    const sql = 'SELECT * FROM project1.ers_reimbursement_status';

    return db.query<StatusRow>(sql, []).then(result => result.rows.map(row => Status.from(row)));
}