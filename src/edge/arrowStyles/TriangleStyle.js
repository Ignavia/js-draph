import _ from "lodash";

import {Vec2}             from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

import * as utils from "../../utils.js";

/**
 * The default configuration of this style.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The color to fill the triangle with.
     *
     * @type {Color}
     */
    backgroundColor: predefinedColors.white,

    /**
     * How the border of the triangle should look.
     *
     * @type {Object}
     */
    border: {

        /**
         * The color of the border.
         *
         * @type {Color}
         */
        color: predefinedColors.black,

        /**
         * The width of the border.
         *
         * @type {Color}
         */
        width: 2
    },

    /**
     * The measures of the triangle. At least two measures must be provided,
     * one can be set to "auto". If all three are given, the tipAngle is ignored.
     *
     * @type {Object}
     */
    measures: {

        /**
         * The angle at the tip of the triangle. Set this to "auto" to
         * automatically determine this.
         *
         * @type {Number|String}
         */
        tipAngle: Math.PI / 4,

        /**
         * The length of the legs of the triangle. Set this to "auto" to
         * automatically determine this.
         *
         * @type {Number|String}
         */
        legLength: "auto",

        /**
         * The length of the base of the triangle. Set this to "auto" to
         * automatically determine this.
         *
         * @type {Number|String}
         */
        baseLength: 15
    }
};

/**
 * Creates a sprite using the given configuration.
 *
 * @param {Object} conf
 * Check the documentation of the default configuration for the structure of
 * this object.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export function makeSprite(conf) {
    const container = makeBox(conf);
    const result    = utils.makeCanvasSprite(container);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
}

/**
 * Creates a sprite using the default configuration.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export function makeSpriteWithDefaultConf() {
    return makeSprite(defaultConf);
}

/**
 * Creates the display object of the triangle.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @return {DisplayObject}
 * The created display object.
 */
function makeBox(conf) {
    const {tip, baseLeft, baseRight} = computeVertices(conf);

    const result = new PIXI.Graphics();
    result.lineStyle(conf.border.width, conf.border.color.hex, conf.border.color.alpha);
    result.beginFill(conf.backgroundColor.hex, conf.backgroundColor.alpha);

    result.moveTo(baseLeft.x,  baseLeft.y);
    result.lineTo(0,           0);
    result.lineTo(baseRight.x, baseRight.y);

    return result;
}

/**
 * Computes the positions of the cornes of the triangles.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @return {Object}
 * The positions of the corners.
 */
function computeVertices(conf) {
    const {baseLength: b, legLength: l} = computeMeasures(conf);
    const h = Math.sqrt(l**2 - (b / 2)**2);

    return {
        tip:       new Vec2(0, 0),
        baseLeft:  new Vec2(-b / 2, h),
        baseRight: new Vec2( b / 2, h),
    };
}

/**
 * Compute the missing measure of the triangle.
 */
function computeMeasures(conf) {
    const autoBaseLength = conf.measures.baseLength === "auto";
    const autoLegLength  = conf.measures.legLength  === "auto";
    const autoTipAngle   = conf.measures.tipAngle   === "auto";

    const numberOfUnknowns = (autoBaseLength ? 1 : 0) +
                             (autoLegLength  ? 1 : 0) +
                             (autoTipAngle   ? 1 : 0);

    if (numberOfUnknowns > 1) {
        throw new Error("At least two measures must be provided.");
    }

    if (autoBaseLength) {
        return {
            baseLength: computeBaseLength(conf),
            legLength:  conf.measures.legLength
        };
    } else if (autoLegLength) {
        return {
            baseLength: conf.measures.baseLength,
            legLength:  computeLegLength(conf)
        };
    } else {
        return {
            baseLength: conf.measures.baseLength,
            legLength:  conf.measures.legLength
        };
    }
}

/**
 * Computes the length of the base of the triangle.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @return {Number}
 * The length of the base.
 */
function computeBaseLength(conf) {
    return 2 * conf.measures.legLength * Math.sin(conf.measures.tipAngle / 2);
}

/**
 * Computes the length of the legs of the triangle.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @return {Number}
 * The length of the legs.
 */
function computeLegLength(conf) {
    return conf.measures.baseLength / (2 * Math.sin(conf.measures.tipAngle / 2));
}
