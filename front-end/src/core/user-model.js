import { Model } from "./model";

class UserModel extends Model {
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
    
    get email() {
        return this._email;
    }

}

export { UserModel };
