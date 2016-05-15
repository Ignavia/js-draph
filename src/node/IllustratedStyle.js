import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

// TODO outsource illustration generation

export const defaultConf = {
    imagePath: "../../img/default.png", // TODO:use loader

    border: {
        color:  predefinedColors.black,
        radius: 5,
        width:  2
    },

    caption: "<Placeholder>",
    captionSide: "below", // below, above, left, right, center, none
    captionGap: 5,

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

export function makeSprite(conf) {
    const container = makeContainer(conf);
    const sprite    = Utils.makeCanvasSprite(container, {
        width:  conf.width,
        height: conf.height
    });

    return sprite;
}

export function makeSpriteWithDefaultConf() {
    return makeSprite(defaultConf);
}

function makeContainer(conf) {
    const result = new PIXI.Container();
    const illustration = Utils.makeImage(conf.imagePath);
    const caption = Utils.makeText(conf.caption, conf.text);

    result.addChild(caption);
    result.addChild(illustration);

    if (conf.captionSide === "above") {
        caption.y -= Math.max(illustration.height, caption.height) / 2 + conf.captionGap;
    } else if (conf.captionSide === "right") {
        caption.x += Math.max(illustration.width,  caption.width)  / 2 + conf.captionGap;
    } else if (conf.captionSide === "below") {
        caption.y += Math.max(illustration.height, caption.height) / 2 + conf.captionGap;
    } else if (conf.captionSide === "left") {
        caption.x -= Math.max(illustration.width,  caption.width)  / 2 + conf.captionGap;
    } else if (conf.captionSide === "none") {
        result.removeChild(caption);
    }

    return result;
}
