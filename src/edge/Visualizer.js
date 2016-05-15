import _ from "lodash";

import StraightStyle from "./lineStyles/StraightStyle.js";
import * as LabelledStyle from "./decalStyles/LabelledStyle.js";

export default class Visualizer {
    constructor(conf) {
        _.merge(this, Visualizer.default, conf);
    }

    makeDisplayObject(edgeObj, graphicalComponent) {
        const container = new PIXI.Container();
        const line = this.lineStyle.makeDisplayObject(edgeObj, graphicalComponent);
        const decal = this.decalStyle.makeSpriteWithDefaultConf("placehodler");

        decal.position.x = line.decalAnchor.x;
        decal.position.y = line.decalAnchor.y;

        container.addChild(line);
        container.addChild(decal);

        return container;
    }
}

Visualizer.default = {
    lineStyle:  new StraightStyle(),
    decalStyle: LabelledStyle
};
