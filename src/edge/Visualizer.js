import StraightStyle from "./lineStyles/StraightStyle.js";
import LabelledStyle from "./decalStyles/LabelledStyle.js";

export default class Visualizer {
    constructor() {
        this.lineStyle = new StraightStyle();
        this.decalStyle = new LabelledStyle();
    }

    makeDisplayObject(edgeObj, graphicalComponent) {
        const line = this.lineStyle.makeDisplayObject(edgeObj, graphicalComponent);

        return line;
    }
}
