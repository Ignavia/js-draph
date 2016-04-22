import _ from "lodash";

import {Vec2}        from "@ignavia/ella";
import LabelledStyle from "./LabelledStyle.js";
import Behavior      from "./Behavior.js";

export default class Visualizer {
    constructor(conf = {}) {
        _.merge(this, Visualizer.default, conf);
    }

    makeDisplayObject(nodeObj, graphicalComponent) {
        const displayObject = this.style.makeDisplayObject(nodeObj, graphicalComponent);

        // Add behavior
        displayObject.x        += this.position.x * graphicalComponent.width;
        displayObject.y        += this.position.y * graphicalComponent.height;
        displayObject.scale    = this.scale;
        displayObject.pivot    = this.pivot;
        displayObject.rotation = this.rotation;

        return displayObject;
    }
}

Visualizer.default = {
    style:    new LabelledStyle(),
    behavior: new Behavior(),
    position: new Vec2(Math.random(), Math.random()),
    scale:    new Vec2(1, 1),
    pivot:    new Vec2(0, 0),
    rotation: 0
};