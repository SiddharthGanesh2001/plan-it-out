import { Collection } from "./collection.js";
import { FETCH_URL } from "./constants.js";
import { UserModel } from "./user-model.js";

class UserCollection extends Collection {
    get ModelClass() {
        return UserModel;
    }

    parse(response) {
        return response.map((user) => ({
            id: user.userId,
            name: user.userName,
            email: user.email
        }));
    }

    async fetchFriends(userId) {
        const response = await fetch(`${FETCH_URL}/getFriends?userId=${userId}`);
        this.add(this.parse(await response.json()));
        return this.getAll();
    }

    async fetchAllUsers() {
        const response = await fetch(`${FETCH_URL}/getUsers`);
        this.add(this.parse(await response.json()));
        return this.getAll();
    }
}

export { UserCollection };
