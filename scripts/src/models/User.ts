export class User {
    id: number;
    name: string;

    /**
     * Static function for creating a User instance from the structure the
     * database gives us
     */
    static from(obj: UserRow): User {
        const user = new User(
            obj.id, obj.name
        );
        return user;
    }

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export interface UserRow {
    id: number;
    name: string;
}