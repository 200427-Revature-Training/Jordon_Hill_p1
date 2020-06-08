/* istanbul ignore file */
import { db } from './db';
import { User, UserRow } from '../models/User';

/**
 * getUserByName
 * This function queries the database for the mathcing user name.
 * @param name : string
 */
export function getUserByUsername(name: string): Promise<User> {
    const sql = 'SELECT * FROM project1.ers_users WHERE ers_username = $1';

    return db.query<UserRow>(sql, [name]).then(result => result.rows.map(row => User.from(row))[0]);
}

/**
 * saveUser
 * This function inserts the user into the database.
 * @param user : User
 */
export function saveUser(user: User): Promise<User> {
    const sql = 'INSERT INTO project1.users (ers_username, ers_password, user_first_name,\
        user_last_name, user_email, user_role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    return db.query<UserRow>(sql, [user.username, user.password, user.firstName, user.lastName,
        user.email, user.roleID]).then(result => result.rows.map(row => User.from(row))[0]);
}