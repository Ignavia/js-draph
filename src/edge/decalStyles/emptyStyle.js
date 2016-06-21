import registry             from "../../registry.js";
import {emptyDisplayObject} from "../../utils.js";

/**
 * Creates a sprite.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export default function makeSprite() {
    return emptyDisplayObject;
}
registry.addEdgeDecalStyle("empty", makeSprite);