import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

/**
 * The default configuration of the style.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The background color of the circle.
     *
     * @type {Color}
     */
    backgroundColor: predefinedColors.white,

    /**
     * The border around the circle.
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
         * The line-width of the border.
         *
         * @type {Number}
         */
        width: 2
    },

    /**
     * The radius of the circle.
     *
     * @type {Number}
     */
    radius: 10
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
    const circle = Utils.makeCircle(conf, conf.radius);
    const sprite = Utils.makeCanvasSprite(circle);
    return sprite;
};

/**
 * Creates a sprite using the default configuration.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export function makeSpriteWithDefaultConf() {
    return makeSprite(defaultConf);
}
