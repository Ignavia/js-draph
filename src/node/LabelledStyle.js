import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

export const defaultConf = {
    label: "<Placeholder>",
    backgroundColor: predefinedColors.white,
    border: {
        color:  predefinedColors.black,
        radius: 5,
        width:  2
    },
    padding: 10,
    margin: 2,

    /**
     * The shape of this node. The values "circle", "ellipse", "rect",
     * "roundedRect" are supported. The default value is "ellipse".
     *
     * @type {String}
     */
    shape: "ellipse",

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
            size:   20,
            style:  "normal",
            weight: "bold"
        },
        stroke: {
            color:     predefinedColors.white,
            thickness: 0
        },
        wordWrapWidth: 0
    }
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
    const container = makeContainer(conf);
    const sprite    = Utils.makeCanvasSprite(container, {
        width:  conf.width,
        height: conf.height
    });

    // Placing the texture at the origin of the coordinate system of the sprite
    sprite.anchor = {
        x: 0.5,
        y: 0.5
    };

//-------- REMOVE
    sprite.x = Math.random() * 1000;
    sprite.y = Math.random() * 1000;
    //_-----------

    return sprite;
}

/**
 * Creates a sprite using the default configuration.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export function makeSpriteWithDefaultConf() {
    return makeSprite(defaultConf);
}

function makeContainer(conf) {
    const container = new PIXI.Container();
    const label     = Utils.makeText(conf.label, conf.text);
    const box       = makeBox(label, conf);
    const margin    = makeMargin(box, conf);
    container.addChild(margin);
    container.addChild(box);
    container.addChild(label);
    return container;
}

function makeBox(label, conf) {
    const result = new PIXI.Graphics();
    result.lineStyle(conf.border.width, conf.border.color.hex, conf.border.color.alpha);
    result.beginFill(conf.backgroundColor.hex, conf.backgroundColor.alpha);

    if (conf.shape === "circle") {
        result.drawCircle(
            0,
            0,
            Math.max(label.width, label.height) / 2 + conf.padding
        );
    } else if (conf.shape === "ellipse") {
        result.drawEllipse(
            0,
            0,
            label.width  / Math.sqrt(2) + conf.padding,
            label.height / Math.sqrt(2) + conf.padding
        );
    } else if (conf.shape === "rect") {
        result.drawRect(
            -label.width  / 2 -     conf.padding,
            -label.height / 2 -     conf.padding,
             label.width      + 2 * conf.padding,
             label.height     + 2 * conf.padding
        );
    } else if (conf.shape === "roundedRect") {
        result.drawRoundedRect(
            -label.width  / 2 -     conf.padding,
            -label.height / 2 -     conf.padding,
             label.width      + 2 * conf.padding,
             label.height     + 2 * conf.padding,
            conf.border.radius
        );
    }

    return result;
}

function makeMargin(box, conf) {
    const result = new PIXI.Graphics();
    result.beginFill(predefinedColors.transparent.hex, predefinedColors.transparent.alpha);
    result.drawRect(
        -box.width  / 2 -     conf.margin,
        -box.height / 2 -     conf.margin,
         box.width      + 2 * conf.margin,
         box.height     + 2 * conf.margin
    );
    return result;
}
