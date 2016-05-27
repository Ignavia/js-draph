import registry             from "../../registry.js";
import {emptyDisplayObject} from "../../utils.js";

/**
 * Creates a sprite.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export function makeSprite() {
    return emptyDisplayObject;
}
makeSprite.path = ["edge", "arrowStyle", "empty"];
registry.add(makeSprite.path, makeSprite);