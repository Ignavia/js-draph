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
     * How the line should look.
     *
     * @type {Object}
     */
    line: {

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
        width: 2
    },

    /**
     * Describes the vertex position.
     *
     * @type {Object}
     */
    vertex: {

        /**
         * You start at the source position and move in a straight line towards
         * the target node. This value describe how far you move along this
         * line, with 0 meaning you are still at the source node and 1 meaning
         * you reached the target node.
         *
         * @type {Number}
         */
        parallel: 0.5,

        /**
         * From the point you reached, you move this amount of pixels
         * perpendicular to the connecting line.
         *
         * @type {Number}
         */
        perpendicular: 500,
    },
};

/**
 * Creates a sprite using the given configuration.
 *
 * @param {Vec2} targetPos
 * The position of the target node.
 *
 * @param {Object} conf
 * Check the documentation of the default configuration for the structure of
 * this object.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export default function makeSprite(targetPos, conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const parallel      = targetPos.mul(conf.vertex.parallel);
    const perpendicular = parallel.rotate(Math.PI / 2).normalize().mul(conf.vertex.perpendicular);
    const vertex        = parallel.add(perpendicular);

    const result = new PIXI.Graphics();
    result.lineStyle(conf.line.width, conf.line.color.hex, conf.line.color.alpha);
    result.moveTo(0, 0);
    result.quadraticCurveTo(
        vertex.x,
        vertex.y,
        targetPos.x,
        targetPos.y
    );

    result.decalAnchor = new Vec2(vertex.x, vertex.y);
    result.arrow = {
        anchor: new Vec2(0, 0),
        angle: 0,
    };

    return result;
};
registry.addEdgeLineStyle("quadraticCurve", makeSprite);
