import {Vec2} from "@ignavia/ella";

import {makeSpriteWithDefaultConf} from "./styles/SimpleStyle.js";
import {addBehavior}               from "./behaviors/EmptyBehavior.js";
import * as Utils                  from "../Utils.js";

/**
 * The default configuration of this visualizer.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The configuration of the style to use.
     *
     * @type {Object}
     */
    style: {

        /**
         * The function to call to make the sprite.
         *
         * @type {Function}
         */
        function: makeSpriteWithDefaultConf,

        /**
         * The parameters to pass to the function.
         *
         * @type {Array}
         */
        params: []
    },

    /**
     * The configuration of the behavior to use.
     *
     * @type {Object}
     */
    behavior: {

        /**
         * The function to call to add the behavior.
         *
         * @type {Function}
         */
        function: addBehavior,

        /**
         * The parameters to pass to the function.
         *
         * @type {Array}
         */
        params: []
    },

    /**
     * Where to place the sprite.
     *
     * @type {Vec2}
     */
    position: new Vec2(0, 0),

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
 * to the given configuration.
 *
 * @param {Object} conf
 * The configuration of the visualizer. Check the default configuration to see
 * the structure of this object.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export const makeEnhancedSprite = function (conf) {
    const result = conf.style.function(...conf.style.params);

    conf.behavior.function(...conf.behavior.params, result);

    Utils.setPosition(conf.position, result);
    Utils.setScale(conf.scale, result);
    Utils.setPivot(conf.pivot, result);
    Utils.setRotation(conf.rotation);

    return result;
};

/**
 * Makes a sprite with behavior and positions, rotates and scales it according
 * to the default configuration.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export function makeEnhancedSpriteWithDefaultConf() {
    return makeEnhancedSprite(defaultConf);
}
