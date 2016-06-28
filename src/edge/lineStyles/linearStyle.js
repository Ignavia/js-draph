import {predefinedColors} from "@ignavia/util";
import {Vec2}             from "@ignavia/ella";

import registry   from "../../registry.js";
import * as utils from "../../utils.js";

/**
 * The default configuration of this style.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The color of the line.
     *
     * @type {Color}
     */
    color: predefinedColors.black,

    /**
     * The width of the line.
     *
     * @type {Number}
     */
    width: 2,
};

/**
 * Creates a sprite using the given configuration.
 *
 * @param {Vec2} targetPos
 * Where the line should end.
 *
 * @param {Object} [conf]
 * Check the documentation of the default configuration for the structure of
 * this object.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export default function makeSprite(targetPos, conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const line   = utils.makeLine(conf, new Vec2(0, 0), targetPos);
    const result = utils.makeCanvasSprite(line);
    result.decal = computePosAndAngle(targetPos, 0.5);
    result.arrow = computePosAndAngle(targetPos, 0.75);

    return result;
};
registry.addEdgeLineStyle("linear", makeSprite);

/**
 * Computes the point and slope of the function at the given value.
 *
 * @param {Vec2} targetPos
 * The end point of the line.
 *
 * @param {Number} t
 * How to move far along the line. 0 represents the start point (0, 0) and 1 is
 * the end point.
 */
function computePosAndAngle(targetPos, t) {
    return {
        pos:   targetPos.mul(t),
        angle: Math.atan2(targetPos.y, targetPos.x),
    };
}