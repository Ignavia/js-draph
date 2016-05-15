import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import * as Utils from "../../Utils.js";

export const defaultConf = {
    label: "<Placeholder>",
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
    shape: "rect",

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

export function makeSprite(conf) {
    const container = makeContainer(conf);
    const sprite    = Utils.makeCanvasSprite(container, {
        width:  conf.width,
        height: conf.height
    });

    sprite.visible = conf.visibility;

    // Placing the texture at the origin of the coordinate system of the sprite
    sprite.anchor = {
        x: 0.5,
        y: 0.5
    };

    return sprite;
}

export function makeSpriteWithDefaultConf() {
    return makeSprite(defaultConf);
}

function makeContainer(conf) {
    const container = new PIXI.Container();
    const label     = Utils.makeText(conf.label, conf.text);
    const box       = Utils.makeBox(label, conf);
    const margin    = Utils.makeMargin(box, conf);
    container.addChild(margin);
    container.addChild(box);
    container.addChild(label);
    return container;
}
