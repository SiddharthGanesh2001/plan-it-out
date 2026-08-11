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
        if (this.instance === undefined) {
            this.instance = new this();
        }
        return this.instance;
    }

    instantiateModels(data) {
        return data.map((item) => new this.ModelClass(item));
    }

    add(models, index) {
        const instances = this.instantiateModels(models);
        if (index !== undefined) {
            this.store.splice(index, 0, ...instances);
        } else {
            this.store.push(...instances);
        }
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

    get length() {
        return this.store.length;
    }

    async fetch(url) {
        const response = await fetch(url);
        const data = await response.json();
        this.store = this.instantiateModels(data);
        return this;
    }

    find(id) {
        return this.store.find(model => model.id === id);
    }

    filter(fn) {
        return this.store.filter(fn);
    }

    map(fn) {
        return this.store.map(fn);
    }
}

export { Collection };
