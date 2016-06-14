import registry from "../../registry.js";

/**
 * Does absolutely nothing.
 *
 * @param {DisplayObject} displayObject
 * The display object to add behavior to.
 */
export default function addBehavior(displayObject) {}
registry.addEdgeBehavior("empty", addBehavior);