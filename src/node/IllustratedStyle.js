import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

export const defaultConf = {
    imagePath: "../../img/default.png", // TODO:use loader

    border: {
        color:  predefinedColors.black,
        radius: 5,
        width:  2
    },

    caption: {
        side: "below", // below, above, left, right, center, none
        gap:  5
    },

    text: {
        align:  "left",
        dropShadow: {
            angle:    Math.PI / 4,
            color:    predefinedColors.gray,
            distance: 0
        },
        fillColor: predefinedColors.gray,
        font: {
            family: "Arial",
            size:   10,
            style:  "normal",
            weight: "bold"
        },
        stroke: {
            color: predefinedColors.white,
            thickness: 0
        },
        wordWrapWidth:   0
    }
};

export function makeSprite(conf, imagePath, caption) {
    const container = makeContainer(conf, imagePath, caption);
    const sprite    = Utils.makeCanvasSprite(container, {
        width:  conf.width,
        height: conf.height
    });

    return sprite;
}

export function makeSpriteWithDefaultConf() {
    return makeSprite(defaultConf);
}

function makeContainer(conf, imagePath, s) {
    const result = new PIXI.Container();
    const illustration = Utils.makeImage(imagePath);

    if (conf.captionSide !== "none") {
        const caption = Utils.makeCaption(conf, s, illustration);
        result.addChild(caption);
    }

    result.addChild(illustration);

    return result;
}
