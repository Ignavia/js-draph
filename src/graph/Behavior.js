import {EventManager, observableMixin} from "@ignavia/util";

export default class Behavior {
    constructor() {
        this.zoomFactor = 1.1;

        this.maxScaleX = 1;
        this.minScaleX = 0.1;

        this.maxScaleY = 1;
        this.minScaleY = 0.1;

        this.eventManager = new EventManager();
    }
}

// Make graph behaviors observable
Object.assign(Behavior.prototype, observableMixin);
