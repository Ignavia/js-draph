import registry from "../../registry.js";

/**
 * Does absolutely nothing.
 *
 * @param {DisplayObject} displayObject
 * The display object to add behavior to.
 */
export function addBehavior(displayObject) {}
addBehavior.path = ["edge", "behavior", "empty"];
registry.add(addBehavior.path, addBehavior);