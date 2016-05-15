import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import * as Utils from "../../Utils.js";

export const defaultConf = {

    box: {
        backgroundColor: predefinedColors.white,
        border: {
            color:  predefinedColors.black,
            radius: 5,
            width:  2
        },
        padding: 5,
        margin: 2,

        /**
         * The shape of this node. The values "circle", "ellipse", "rect",
         * "roundedRect" are supported. The default value is "ellipse".
         *
         * @type {String}
         */
        shape: "rect"
    },

    text: {
        align:  "left",
        dropShadow: {
            angle:    Math.PI / 4,
            color:    predefinedColors.gray,
            distance: 0
        },
        fillColor: predefinedColors.black,
        font: {
            family: "Arial",
            size:   16,
            style:  "normal",
            weight: "bold"
        },
        stroke: {
            color: predefinedColors.white,
            thickness: 0
        },
        wordWrapWidth: 0
    }
};

export const makeSprite = _.curry(function (conf, label) {
    const container = Utils.makeBoxedLabel(conf, label);
    const result    = Utils.makeCanvasSprite(container);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
});

export const makeSpriteWithDefaultConf = makeSprite(defaultConf);
