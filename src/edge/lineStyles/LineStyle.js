import {predefinedColors} from "@ignavia/util";

export default class LineStyle {
    constructor() {
        this.line = {
            color:  predefinedColors.black,
            width:  2
        };
    }

    makeDisplayObject(edgeObj, graphicalComponent) {}
}

