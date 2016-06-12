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
         * @type {Function}
         */
        function: straightLineStyle,

        /**
         * The parameters to pass to the function.
         *
         * @type {Array}
         */
        params: []
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
         * @type {Function}
         */
        function: emptyDecalStyle,

        /**
         * The parameters to pass to the function.
         *
         * @type {Array}
         */
        params: ["label"]
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
         * @type {Function}
         */
        function: emptyArrowStyle,

        /**
         * The parameters to pass to the function.
         *
         * @type {Array}
         */
        params: []
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
         * @type {Function}
         */
        function: emptyBehavior,

        /**
         * The parameters to pass to the function.
         *
         * @type {Array}
         */
        params: []
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

    const container = makeContainer(conf, sourcePos, targetPos);
    const result    = utils.makeCanvasSprite(container);

    for (let behavior of conf.behaviors) {
        behavior.function(result, ...behavior.params);
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
    const line = conf.lineStyle.function(sourcePos, targetPos, ...conf.lineStyle.params);
    result.addChild(line);

    // Make the decal
    const decal = conf.decalStyle.function(...conf.decalStyle.params);
    utils.setPosition(line.decalAnchor, decal);
    result.addChild(decal);

    // Make the arrow
    const arrow = conf.arrowStyle.function(...conf.arrowStyle.params);
    //utils.setPosition(line.arrow.anchor, decal);
    //utils.setRotation(line.arrow.angle, decal); TODO
    result.addChild(arrow);

    return result;
}
