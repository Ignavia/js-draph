import {EventManager, observableMixin, predefinedColors} from "@ignavia/util";

export default class LineStyle {
    constructor() {
        this.line = {
            color:  predefinedColors.black,
            width:  2
        };

        this.eventManager = new EventManager();
    }

    makeDisplayObject(edgeObj, graphicalComponent) {}
}

// Make edge styles observable
Object.assign(LineStyle.prototype, observableMixin);
