import { User } from '../models/User';
import * as userDao from '../daos/user-dao';
import * as hash from 'password-hash';

/**
 * login
 * This function accepts verifies data entered matches with a User object. It then calls getUserByName to verify
 * if the user's name already exists. If it does, reject with a 409. If not, send User object to the dao function of the same name.
 * @param user : any
 */
export async function login(loginData: any): Promise<User> {
    if (!loginData.username || !loginData.password) return new Promise((resolve, reject) => reject(422));

    const user = await userDao.getUserByUsername(loginData.username);
    if (!user) {
        return new Promise((resolve, reject) => reject(404));
    } else {
        if (hash.verify(loginData.password, user.password)) {
            return user;
        } else {
            return new Promise((resolve, reject) => reject(401));
        }
    }
}

/**
 * saveUser
 * This function accepts verifies data entered matches with a User object. It then calls getUserByName to verify
 * if the user's name already exists. If it does, reject with a 409. If not, send User object to the dao function of the same name.
 * @param user : any
 */
export async function saveUser(user: any): Promise<User> {
    // Data from the user cannot be trusted
    if (!(user.username && user.password && user.email && user.firstName && user.lastName))
        return new Promise((resolve, reject) => reject(422));

    const hashedpassword = hash.generate(user.password);
    const newUser = new User(
        undefined, user.username, hashedpassword, user.firstName, user.lastName, user.email,
            (user.roleID ? user.roleID : 1)
    );
    // check if user exists
    const promise = await userDao.getUserByUsername(newUser.username);
    if(!promise) {
        // Data is valid - Continue submitting to DAO
        return userDao.saveUser(newUser);
    } else {
        console.warn('User already exists');
        return new Promise((resolve, reject) => reject(409));
    }
}