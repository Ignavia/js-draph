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
 * Where the line should end
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

    const result = utils.makeLine(conf, new Vec2(0, 0), targetPos);
    result.decal = computeAnchorAndAngle(targetPos, 0.5);
    result.arrow = computeAnchorAndAngle(targetPos, 0.75);

    return result;
};
registry.addEdgeLineStyle("linear", makeSprite);

function computeAnchorAndAngle(targetPos, t) {
    return {
        anchor: targetPos.mul(t),
        angle:  Math.atan2(targetPos.y, targetPos.x),
    };
}