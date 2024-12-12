/* Base class persistable collection.
   Any new collection should be written by extending this class
*/

import { Model } from "./model";

class Collection {
    constructor() {
        this.instance = null;
        this.store = [];
        this.hasPagination = false;
    }

    get ModelClass() {
        // override
        return Model;
    }

    static getInstance() {
        if (this.instance === null) {
            this.instance = new this();
        }
        return this.instance;
    }

    instantiateModels(data) {
        return data.map((item) => new this.ModelClass(item));
    }

    add(models, index) {
        if (index) {
            return {};
        }
        this.store.push(this.instantiateModels(models));
    }

    remove(item) {
        const index = this.store.indexOf(item);
        if (index !== -1) {
            this.store.splice(index, 1);
        }
    }

    getAll() {
        return this.store || [];
    }
}

export { Collection };
