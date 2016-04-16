import {Vec2}        from "@ignavia/ella";
import LabelledStyle from "./LabelledStyle.js";
import Behavior      from "./Behavior.js";

export default class Visualizer {
    constructor() {
        this.style    = new LabelledStyle();
        this.behavior = new Behavior();
        this.position = new Vec2(Math.random(), Math.random());
        this.scale    = new Vec2(1, 1);
        this.pivot    = new Vec2(0, 0);
        this.rotation = 0;
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
