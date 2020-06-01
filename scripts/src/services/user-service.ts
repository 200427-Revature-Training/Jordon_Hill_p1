import { User } from '../models/User';
import * as userDao from '../daos/user-dao';

/**
 * getUserByName
 * This function sends the username to the dao function of the same name
 * @param name : string username
 */
export function getUserByName(name: string): Promise<User> {
    return userDao.getUserByName(name);
}

/**
 * saveUser
 * This function accepts verifies data entered matches with a User object. It then calls getUserByName to verify
 * if the user's name already exists. If it does, reject with a 409. If not, send User object to the dao function of the same name.
 * @param user : any
 */
export async function saveUser(user: any): Promise<User> {
    // Data from the user cannot be trusted
    const newUser = new User(
        undefined, user.name
    );
    // check if user exists
    if (!user.name) return new Promise((resolve, reject) => reject(422));
    const promise = await getUserByName(newUser.name);
    if(!promise) {
        // Data is valid - Continue submitting to DAO
        return userDao.saveUser(newUser);
    } else {
        console.warn('User already exists');
        return new Promise((resolve, reject) => reject(409));
    }
}