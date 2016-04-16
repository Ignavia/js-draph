import {EventManager, observableMixin} from "@ignavia/util";

export default class DecalStyle {
    constructor() {


        this.eventManager = new EventManager();
    }
}

// Make edge styles observable
Object.assign(DecalStyle.prototype, observableMixin);
