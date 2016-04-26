import _ from "lodash";

import StraightStyle from "./lineStyles/StraightStyle.js";
import LabelledStyle from "./decalStyles/LabelledStyle.js";

export default class Visualizer {
    constructor(conf) {
        _.merge(this, Visualizer.default, conf);
    }

    makeDisplayObject(edgeObj, graphicalComponent) {
        const line = this.lineStyle.makeDisplayObject(edgeObj, graphicalComponent);

        return line;
    }
}

Visualizer.default = {
    lineStyle:  new StraightStyle(),
    decalStyle: new LabelledStyle()
};
