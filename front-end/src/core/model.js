/* Base class persistable model.
   Any new model should be written by extending this class
*/

class Model {
    constructor(data = {}) {
        // Store each property with underscore prefix to avoid getter conflicts
        for (const key in data) {
            this["_" + key] = data[key];
        }
    }

    get(property) {
        return this["_" + property];
    }

    set(property, value) {
        this["_" + property] = value;
    }
}

export { Model };
