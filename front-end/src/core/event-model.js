import { Model } from "./model";

class EventModel extends Model {
    get id() {
        return this.id;
    }

    get category() {
        return this.category;
    }

    get description() {
        return this.description;
    }

    get name() {
        return this.name;
    }

    get hostName() {
        return this.hostName
    }

    get location() {
        return this.location
    }

    get dateTime() {
        return this.dateTime
    }

    get count() {
        return this.count;
    }

    get totalCount() {
        return this.totalCount;
    }
}

export { EventModel };
