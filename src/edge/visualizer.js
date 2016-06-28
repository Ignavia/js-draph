import _ from "lodash";

import {Vec2} from "@ignavia/ella";

import EdgeContainer from "./EdgeContainer.js";
import registry      from "../registry.js";
import * as utils    from "../utils.js";

/**
 * The default configuration of this visualizer.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The configuration of the line style.
     *
     * @type {Object}
     */
    lineStyle: {

        /**
         * The function to call to draw the line.
         *
         * @type {String}
         */
        type: "linear",

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {},
    },

    /**
     * The configuration of the decal style.
     *
     * @type {Object}
     */
    decalStyle: {

        /**
         * The function to call to make the decal.
         *
         * @type {String}
         */
        type: "empty",

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {},
    },

    /**
     * The configuration of the arrow style.
     *
     * @type {Object}
     */
    arrowStyle: {

        /**
         * The function to call to make the arrow.
         *
         * @type {String}
         */
        type: "triangle",

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {},
    },

     /**
     * The configuration of the behaviors to use.
     *
     * @type {Array<Object>}
     */
    behaviors: [{

        /**
         * The function to call to add the behavior.
         *
         * @type {String}
         */
        type: "empty",

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {},
    }],

    /**
     * How to scale the decal. x- and y-scales can be set seperately. If the
     * width or height is set, those values are used instead.
     *
     * @type {Number|Vec2}
     */
    scale: 1,

    /**
     * The width of the decal. Set this to "orig" to use the width of the
     * original decal and to "auto" to keep the aspect ratio when setting
     * the height.
     *
     * @type {Number|String}
     */
    width: "orig",

    /**
     * The height of the decal. Set this to "orig" to use the height of the
     * original decal and to "auto" to keep the aspect ratio when setting
     * the width.
     *
     * @type {Number|String}
     */
    height: "orig",

    /**
     * The rotation angle of the display object.
     *
     * @type {Number}
     */
    rotation: 0
};

/**
 * Makes a sprite with behavior and positions, rotates and scales it according
 * to the given configuration. This function is curried.
 *
 * @param {Vec2} sourcePos
 * The position of the source node.
 *
 * @param {Vec2} targetPos
 * The position of the target node.
 *
 * @param {Object} conf
 * The configuration of the visualizer. Check the default configuration to see
 * the structure of this object.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export default function makeEnhancedSprite(sourcePos, targetPos, conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const result = makeContainer(conf, sourcePos, targetPos);

    for (let behavior of conf.behaviors) {
        const behaviorFunction = registry.get(["edge", "behavior", behavior.type]);
        behaviorFunction(result, behavior.conf);
    }

    utils.setPosition(sourcePos, result);
    //result.hitArea = utils.computeHitArea(result.getDecal());

    return result;
};

/**
 * Creates container used to make the final sprite.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @param {Vec2} sourcePos
 * The position of the source node.
 *
 * @param {Vec2} targetPos
 * The position of the target node.
 *
 * @return {DisplayObject}
 * The created display object.
 */
function makeContainer(conf, sourcePos, targetPos) {

    // Make the line
    const lineStyle = registry.get(["edge", "lineStyle", conf.lineStyle.type]);
    const line      = lineStyle(targetPos.sub(sourcePos), conf.lineStyle.conf);

    // Make the decal
    const decalStyle = registry.get(["edge", "decalStyle", conf.decalStyle.type]);
    const decal      = decalStyle(conf.decalStyle.conf);
    utils.setScale(conf.scale, decal);
    utils.setBounds(conf.width, conf.height, decal);
    utils.setRotation(conf.rotation, decal);
    rotateDecal(line.decal.angle, decal);
    utils.setPosition(line.decal.pos, decal);

    // Make the arrow
    const arrowStyle = registry.get(["edge", "arrowStyle", conf.arrowStyle.type]);
    const arrow      = arrowStyle(conf.arrowStyle.conf);
    utils.setPosition(line.arrow.pos, arrow);
    utils.setRotation(line.arrow.angle, arrow);

    return new EdgeContainer(arrow, decal, line);
}

/**
 * Rotates the given decal using the suggested angle.
 *
 * @param {Number} suggestedAngle
 * The angle to rotate by. This is adjusted by the function to make the decal
 * more readable.
 *
 * @param {DisplayObject} decal
 * The display object to rotate.
 */
function rotateDecal(suggestedAngle, decal) {
    if (decal.rotateToLine) {
        if (suggestedAngle < 0) {
            suggestedAngle += 2 * Math.PI;
        }
        if (Math.PI / 2 < suggestedAngle && suggestedAngle < 1.5 * Math.PI) {
            utils.setRotation(suggestedAngle + Math.PI, decal);
        } else {
            utils.setRotation(suggestedAngle, decal);
        }
    }
}
