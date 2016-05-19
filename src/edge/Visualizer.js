import _ from "lodash";

import {Vec2} from "@ignavia/ella";

import * as straightLineStyle from "./lineStyles/straightStyle.js";
import * as emptyDecalStyle   from "./decalStyles/emptyStyle.js";
import * as emptyArrowStyle   from "./arrowStyles/emptyStyle.js";
import * as emptyBehavior     from "./behaviors/emptyBehavior.js";

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
        function: straightLineStyle.makeSpriteWithDefaultConf,

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
        function: emptyDecalStyle.makeSprite,

        /**
         * The parameters to pass to the function.
         *
         * @type {Array}
         */
        params: []
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
        function: emptyArrowStyle.makeSprite,

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
        function: emptyBehavior.addBehavior,

        /**
         * The parameters to pass to the function.
         *
         * @type {Array}
         */
        params: []
    }],

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
export function makeEnhancedSprite(conf) {
    const container = makeContainer(conf);
    const result    = Utils.makeCanvasSprite(container);

    for (let behavior of conf.behaviors) {
        behavior.function(...behavior.params, result);
    }

    Utils.setPosition(conf.position, result);
    Utils.setScale(conf.scale, result);
    Utils.setPivot(conf.pivot, result);
    Utils.setRotation(conf.rotation, result);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
}

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

/**
 * Creates container used to make the final sprite.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @return {DisplayObject}
 * The created display object.
 */
function makeContainer(conf) {
    const result = new PIXI.Container();

    // Make the line
    const line = conf.lineStyle.function(...conf.lineStyle.params);
    result.addChild(line);

    // Make the decal
    const decal = conf.decalStyle.function(...conf.decalStyle.params);
    Utils.setPosition(line.decalAnchor, decal);
    result.addChild(decal);

    // Make the arrow
    const arrow = conf.arrowStyle.function(...conf.arrowStyle.params);
    Utils.setPosition(line.arrow.anchor, decal);
    Utils.setRotation(line.arrow.angle, decal);
    result.addChild(arrow);

    return result;
}
