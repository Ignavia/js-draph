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
     * How the box should look like.
     *
     * @type {Object}
     */
    box: {

        /**
         * The color to fill the box with.
         *
         * @type {Color}
         */
        backgroundColor: predefinedColors.white,

        /**
         * How the border of the box should look.
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
             * The radius of the border. This option only works when the shape is
             * set to "roundedRect".
             *
             * @type {Number}
             */
            radius: 5,

            /**
             * The width of the border.
             *
             * @type {Number}
             */
            width: 2
        },

        /**
         * The margin to add around the box. This might be necessary to prevent PIXI
         * from cutting some pixels of the border off.
         *
         * @type {Number}
         */
        margin: 2,

        /**
         * The padding to add around the label.
         *
         * @type {Number}
         */
        padding: 10,

        /**
         * The shape of this node. The values "circle", "ellipse", "rect",
         * "roundedRect" are supported.
         *
         * @type {String}
         */
        shape: "ellipse"
    },

    /**
     * How the label should look.
     *
     * @type {Object}
     */
    text: {

        /**
         * The label to use.
         *
         * @type {String}
         */
        label: "",

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
            size: 20,

            /**
             * The style of the font. This can either be "normal", "italic" or "oblique".
             *
             * @type {String}
             */
            style: "normal",

            /**
             * The weight of the font. This can either be "light", "normal" or "bold".
             */
            weight: "bold"
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
};

/**
 * Creates a sprite using the given configuration.
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

    const container = utils.makeBoxedLabel(conf, conf.text.label);
    const result    = utils.makeCanvasSprite(container);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
};
registry.addNodeStyle("labelled", makeSprite);
