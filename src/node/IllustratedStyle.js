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
        fill: predefinedColors.gray,
        font: {
            family: "Arial",
            size:   10,
            style:  "normal",
            weight: "bold"
        },
        stroke:          predefinedColors.white,
        strokeThickness: 0,
        wordWrapWidth:   0
    },

    width: 1,
    height: 100
};

function makeContainer(conf) {
    const result = new PIXI.Container();
    const illustration = makeIllustration(conf);
    const caption = makeCaption(conf);

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

function makeIllustration(conf) {
    const result = PIXI.Sprite.fromImage(conf.imagePath);
    result.x = -result.width  / 2;
    result.y = -result.height / 2;
    return result;
}

function makeCaption(conf) {
    const result = new PIXI.Text(conf.caption, {
        align:              conf.text.align,
        dropShadow:         conf.text.dropShadow.distance > 0,
        dropShadowAngle:    conf.text.dropShadow.angle,
        dropShadowColor:    conf.text.dropShadow.color.hex,
        dropShadowDistance: conf.text.dropShadow.distance,
        fill:               conf.text.fill.hex,
        font:               `${conf.text.font.weight} ${conf.text.font.style} ${conf.text.font.size}px ${conf.text.font.family}`,
        stroke:             conf.text.stroke.hex,
        strokeThickness:    conf.text.strokeThickness,
        wordWrap:           conf.text.wordWrapWidth > 0,
        wordWrapWidth:      conf.text.wordWrapWidth
    });
    result.x = -result.width  / 2;
    result.y = -result.height / 2;
    return result;
}

export const makeDisplayObject = function (conf = defaultConf) {
    const container = makeContainer(conf);
    const sprite    = Utils.makeCanvasSprite(container, {
        width:  conf.width,
        height: conf.height
    });
    console.log(sprite)

    return sprite;
}
