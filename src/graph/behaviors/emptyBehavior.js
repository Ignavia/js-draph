import registry from "../../registry.js";

/**
 * Does absolutely nothing.
 *
 * @param {DisplayObject} stage
 * The stage hosting the node and edge graphics.
 *
 * @param {Renderer} renderer
 * The renderer in use.
 */
export default function addBehavior(stage, renderer) {}
addBehavior.path = ["graph", "behavior", "empty"];
registry.add(addBehavior.path, addBehavior);