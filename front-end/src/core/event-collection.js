import { Collection } from "./collection";
import { ConfigHolder, FETCH_URL } from "./constants";
import { EventModel } from "./event-model";

class EventCollection extends Collection {
    constructor() {
        super();
        this.limit = 25;
    }
    get ModelClass() {
        return EventModel;
    }

    parse(response) {
        return response.map((event) => ({
            category: event.category,
            description: event.description,
            id: event.eventId,
            location: event.location,
            dateTime: event.dateTime,
            name: event.eventName,
            hostName: event.hostName,
            totalCount: event.totalCount,
            count: event.count
        }));
    }

    async fetchDiscoverEvents() {
        const response = await fetch(`${FETCH_URL}/getEvents?userId=${ConfigHolder.userId}&mode=1`)
        super.add(this.parse(await response.json()));
        return super.getAll();
    }

    async fetchMyEvents() {
        const response = await fetch(`${FETCH_URL}/getEvents?userId=${ConfigHolder.userId}&mode=2`)
        this.parse(await response.json());
        return super.getAll();
    }
}

export { EventCollection };
