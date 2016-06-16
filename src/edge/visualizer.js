import _ from "lodash";

import {Vec2} from "@ignavia/ella";

import straightLineStyle from "./lineStyles/straightStyle.js";
import emptyDecalStyle   from "./decalStyles/emptyStyle.js";
import emptyArrowStyle   from "./arrowStyles/emptyStyle.js";
import emptyBehavior     from "./behaviors/emptyBehavior.js";
import registry          from "../registry.js";
import * as utils        from "../utils.js";

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
        type: "straight",

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
        type: "empty",

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
     * How to scale the sprite. x- and y-scales can be set seperately.
     *
     * @type {Number|Vec2}
     */
    scale: 1,

    /**
     * The point to rotate the display object about.
     *
     * @type {Vec2}
     */
    pivot: new Vec2(0, 0),

    /**
     * The rotation angle of the display object.
     *
     * @type {Number}
     */
    rotation: 0,
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

    const container = makeContainer(conf, sourcePos, targetPos);
    const result    = utils.makeCanvasSprite(container);

    for (let behavior of conf.behaviors) {
        const behaviorFunction = registry.get(["edge", "behavior", behavior.type]);
        behaviorFunction(result, behavior.conf);
    }

    utils.setPosition(sourcePos, result);
    console.log(sourcePos,result);
    utils.setScale(conf.scale, result);
    utils.setPivot(conf.pivot, result);
    utils.setRotation(conf.rotation, result);
console.log(container)
    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = computeAnchor(container);

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
    const result = new PIXI.Container();

    // Make the line
    const lineStyle = registry.get(["edge", "lineStyle", conf.lineStyle.type]);
    const line      = lineStyle(targetPos.sub(sourcePos), conf.lineStyle.conf);
    result.addChild(line);

    // Make the decal
    const decalStyle = registry.get(["edge", "decalStyle", conf.decalStyle.type]);
    const decal      = decalStyle(conf.decalStyle.conf);
    utils.setPosition(line.decalAnchor, decal);
    result.addChild(decal);

    // Make the arrow
    const arrowStyle = registry.get(["edge", "arrowStyle", conf.arrowStyle.type]);
    const arrow      = arrowStyle(conf.arrowStyle.conf);
    //utils.setPosition(line.arrow.anchor, arrow);
    //utils.setRotation(line.arrow.angle, arrow); TODO
    result.addChild(arrow);

    return result;
}

function computeAnchor(container) {
    const {x, y, width, height} = container.getBounds();
    return {
        x: -x / width,
        y: -y / height,
    };
}
