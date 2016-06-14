import {predefinedColors} from "@ignavia/util";

import registry   from "../../registry.js";
import * as utils from "../../utils.js";

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
export default function makeSprite(conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const circle = utils.makeCircle(conf, conf.radius);
    const result = utils.makeCanvasSprite(circle);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
};
registry.addNodeStyle("simple", makeSprite);
