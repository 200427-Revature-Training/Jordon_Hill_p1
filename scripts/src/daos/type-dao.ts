/* istanbul ignore file */
import { db } from './db';
import { Type, TypeRow } from '../models/Type';

/**
 * getAllType
 * This function queries the database for all Type.
 */
export function getAllTypes(): Promise<Type[]> {
    const sql = 'SELECT * FROM project1.ers_reimbursement_type';

    return db.query<TypeRow>(sql, []).then(result => result.rows.map(row => Type.from(row)));
}