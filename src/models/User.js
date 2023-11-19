export class User {
    constructor(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.displayName = user.displayName;
        this.accessType = user.accessType;
    }
}