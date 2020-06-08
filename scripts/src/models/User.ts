export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roleID: number;

    /**
     * Static function for creating a User instance from the structure the
     * database gives us
     */
    static from(obj: UserRow): User {
        const user = new User(
            obj.ers_users_id, obj.ers_username, obj.ers_password,
                obj.user_first_name, obj.user_last_name,
                obj.user_email, obj.user_role_id
        );
        return user;
    }

    constructor(id: number, username: string, password: string,
        firstName: string, lastName: string, email: string,
        roleID: number) {
            this.id = id;
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.roleID = roleID;
    }
}

export interface UserRow {
    ers_users_id: number;
    ers_username: string;
    ers_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_role_id: number;
}