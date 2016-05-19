import _ from "lodash";

import {Vec2}        from "@ignavia/ella";
import * as LabelledStyle from "./LabelledStyle.js";
import Behavior      from "./Behavior.js";

export default class Visualizer {
    constructor(conf = {}) {
        _.merge(this, Visualizer.default, conf);

        this.position =new Vec2(Math.random(), Math.random());// TODO: remove
    }


}

export function makeDisplayObject(nodeObj, graphicalComponent) {
    const displayObject = this.style.makeDisplayObject(nodeObj, graphicalComponent);
    this.addBehavior(displayObject);

    displayObject.x        += this.position.x * graphicalComponent.width;
    displayObject.y        += this.position.y * graphicalComponent.height;
    displayObject.scale    = this.scale;
    displayObject.pivot    = this.pivot;
    displayObject.rotation = this.rotation;

    return displayObject;
}

Visualizer.default = {
    style:    LabelledStyle,
    behavior: new Behavior(),
    position: new Vec2(0, 0),
    scale:    new Vec2(1, 1),
    pivot:    new Vec2(0, 0),
    rotation: 0
};
