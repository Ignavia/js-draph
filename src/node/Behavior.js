import {EventManager, observableMixin} from "@ignavia/util";

export default class Behavior {
    constructor() {
        this.eventManager = new EventManager();
    }
}

// Make node behaviors observable
Object.assign(Behavior.prototype, observableMixin);
