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
         * @type {Function|GumpPath}
         */
        function: straightLineStyle,

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
         * @type {Function|GumpPath}
         */
        function: emptyDecalStyle,

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: ["label"],
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
         * @type {Function|GumpPath}
         */
        function: emptyArrowStyle,

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
         * @type {Function|GumpPath}
         */
        function: emptyBehavior,

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
        const behaviorFunction = registry.toFunction(behavior.function);
        behaviorFunction(result, behavior.conf);
    }

    const center = new Vec2(
        (sourcePos.x + targetPos.x) / 2,
        (sourcePos.y + targetPos.y) / 2
    );

    utils.setPosition(center, result);
    utils.setScale(conf.scale, result);
    utils.setPivot(conf.pivot, result);
    utils.setRotation(conf.rotation, result);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
};
makeEnhancedSprite.path = ["edge", "visualizer"];
registry.add(makeEnhancedSprite.path, makeEnhancedSprite);

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
    const lineStyle = registry.toFunction(conf.lineStyle.function);
    const line      = lineStyle(sourcePos, targetPos, conf.lineStyle.conf);
    result.addChild(line);

    // Make the decal
    const decalStyle = registry.toFunction(conf.decalStyle.function);
    const decal      = decalStyle(conf.decalStyle.conf);
    utils.setPosition(line.decalAnchor, decal);
    result.addChild(decal);

    // Make the arrow
    const arrowStyle = registry.toFunction(conf.arrowStyle.function);
    const arrow      = arrowStyle(conf.arrowStyle.conf);
    //utils.setPosition(line.arrow.anchor, decal);
    //utils.setRotation(line.arrow.angle, decal); TODO
    result.addChild(arrow);

    return result;
}
