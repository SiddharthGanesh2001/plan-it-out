import { Model } from "./model";

class EventModel extends Model {
    get id() {
        return this._id;
    }

    get category() {
        return this._category;
    }

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }

    get hostName() {
        return this._hostName;
    }

    get location() {
        return this._location;
    }

    get dateTime() {
        return this._dateTime;
    }

    get count() {
        return this._count;
    }

    get totalCount() {
        return this._totalCount;
    }
}

export { EventModel };
