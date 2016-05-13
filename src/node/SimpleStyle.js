import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

/**
 * The default configuration of the style.
 */
export const defaultConf = {

    /**
     * The background color of the circle.
     */
    backgroundColor: predefinedColors.white,

    /**
     * The border around the circle.
     */
    border: {

        /**
         * The color of the border.
         */
        color: predefinedColors.black,

        /**
         * The line-width of the border.
         */
        width: 2
    },

    /**
     * The radius of the circle.
     */
    radius: 10,

    /**
     * Whether to show the created sprite.
     */
    visible: true
};

/**
 * Creates a sprite using the given configuration.
 *
 * @param {Object} conf
 * Check the documentation of the default configuration for the structure of
 * this object.
 */
export function makeSprite(conf) {
    const circle = Utils.makeCircle(conf);
    const sprite = Utils.makeCanvasSprite(circle);

    sprite.visible = conf.visible;

    return sprite;
};

/**
 * Creates a sprite using the default configuration.
 */
export function makeSpriteWithDefaultConf() {
    return makeSprite(defaultConf);
}
