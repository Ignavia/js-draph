import $ from "jquery";

import registry from "../../registry.js";

/**
 * Adds this behavior to the given stage and renderer.
 *
 * @param {DisplayObject} stage
 * The stage to move while panning.
 *
 * @param {Renderer} renderer
 * The renderer to add the event listener to.
 */
export default function addBehavior(stage, renderer) {
    $(renderer.view).mousedown((e) => {
        stage.lastPos = {x: e.offsetX, y: e.offsetY};
    }).mouseup((e) => {
        stage.lastPos = undefined;
    }).mousemove((e) => {
        if (stage.lastPos) {
            stage.x      += e.offsetX - stage.lastPos.x;
            stage.y      += e.offsetY - stage.lastPos.y;
            stage.lastPos = {x: e.offsetX, y: e.offsetY};
        }
    }).mouseleave((e) => {
        stage.lastPos = undefined;
    });
};
addBehavior.path = ["graph", "behavior", "pan"];
registry.add(addBehavior.path, addBehavior);
