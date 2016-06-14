import {predefinedColors} from "@ignavia/util";

import registry   from "../../registry.js";
import * as utils from "../../utils.js";

/**
 * The default configuration of this style.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * Affects the style of the caption.
     *
     * @type {Object}
     */
    caption: {

        /**
         * How large the gap between the given display object and the caption should be.
         *
         * @type {Number}
         */
        gap: 5,

        /**
         * Where the caption should be positioned in relation to the given display
         * object. Possible options are "center", "above", "right", "below" and "left".
         *
         * @type {String}
         */
        side: "below", // below, above, left, right, center, none

        /**
         * How the text itself should look.
         *
         * @type {Object}
         */
        text: {

            /**
             * How the text should be aligned. The possible values are "left", "center" and
             * "right". For a single line of text this option has no effect.
             *
             * @type {String}
             */
            align:  "left",

            /**
             * How the drop shadow of the text should look.
             *
             * @type {Object}
             */
            dropShadow: {

                /**
                 * The angle of the drop shadow given in radian. An angle of 0 means that the
                 * shadow goes to the right, increasing the angle moves the shadow clockwise.
                 *
                 * @type {Number}
                 */
                angle: Math.PI / 4,

                /**
                 * The color of the shadow.
                 *
                 * @type {Color}
                 */
                color: predefinedColors.gray,

                /**
                 * How long the drop shadow should be. Set this to 0 to remove it.
                 *
                 * @type {Number}
                 */
                distance: 0
            },

            /**
             * The color to fill the text with.
             *
             * @type {Color}
             */
            fillColor: predefinedColors.black,

            /**
             * Configures the font of the text.
             *
             * @type {Object}
             */
            font: {

                /**
                 * The font-family to use.
                 *
                 * @type {String}
                 */
                family: "Arial",

                /**
                 * The font-size to use.
                 *
                 * @type {Number}
                 */
                size: 8,

                /**
                 * The style of the font. This can either be "normal", "italic" or "oblique".
                 *
                 * @type {String}
                 */
                style: "normal",

                /**
                 * The weight of the font. This can either be "light", "normal" or "bold".
                 */
                weight: "normal"
            },

            /**
             * How the stroke around the text should look.
             *
             * @type {Object}
             */
            stroke: {

                /**
                 * The color of the stroke around the text.
                 *
                 * @type {Color}
                 */
                color: predefinedColors.white,

                /**
                 * How thick the stroke should be. Set this to 0 to deactivate it.
                 *
                 * @type {Number}
                 */
                thickness: 0
            },

            /**
             * The width at which the text is going to wrap. Set this to 0 to
             * disable it.
             *
             * @type {Number}
             */
            wordWrapWidth: 0
        }
    },

    /**
     * How the image should look.
     *
     * @type {Object}
     */
    image: {

        /**
         * The path to the image to display.
         *
         * @type {String}
         */
        imagePath: "", // TODO: path to default picture

        /**
         * The caption to display.
         *
         * @type {String}
         */
        caption: "",

        /**
         * The width of the image. Set this to "orig" to use the width of the
         * original image and to "auto" to keep the aspect ratio when setting
         * the height.
         *
         * @type {Number|String}
         */
        width: "orig",

        /**
         * The height of the image. Set this to "orig" to use the height of the
         * original image and to "auto" to keep the aspect ratio when setting
         * the width.
         *
         * @type {Number|String}
         */
        height: "orig"
    }
};

/**
 * Creates a sprite using the given configuration. This function is curried.
 *
 * @param {Object} [conf]
 * Check the documentation of the default configuration for the structure of
 * this object.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export default function makeSprite(conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const container = utils.makeCaptionedImage(conf, conf.image.imagePath, conf.image.caption);
    const result    = utils.makeCanvasSprite(container);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
};
registry.addEdgeDecalStyle("illustrated", makeSprite);
