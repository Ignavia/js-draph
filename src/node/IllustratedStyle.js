import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import Style from "./Style.js";
import * as Utils from "../Utils.js";

// TODO outsource illustration generation

export default class IllustratedStyle extends Style {
    constructor(conf = {}) {
        super();
        _.merge(this, IllustratedStyle.default, conf);
    }

    makeContainer() {
        const result = new PIXI.Container();
        const illustration = this.makeIllustration();
        const caption = this.makeCaption();

        result.addChild(caption);
        result.addChild(illustration);

        if (this.captionSide === "above") {
            caption.y -= Math.max(illustration.height, caption.height) / 2 + this.captionGap;
        } else if (this.captionSide === "right") {
            caption.x += Math.max(illustration.width,  caption.width)  / 2 + this.captionGap;
        } else if (this.captionSide === "below") {
            caption.y += Math.max(illustration.height, caption.height) / 2 + this.captionGap;
        } else if (this.captionSide === "left") {
            caption.x -= Math.max(illustration.width,  caption.width)  / 2 + this.captionGap;
        } else if (this.captionSide === "none") {
            result.removeChild(caption);
        }

        return result;
    }

    makeIllustration() {
        const result = PIXI.Sprite.fromImage(this.imagePath);
        result.x = -result.width  / 2;
        result.y = -result.height / 2;
        return result;
    }

    makeCaption() {
        const result = new PIXI.Text(this.caption, {
            align:              this.text.align,
            dropShadow:         this.text.dropShadow.distance > 0,
            dropShadowAngle:    this.text.dropShadow.angle,
            dropShadowColor:    this.text.dropShadow.color.hex,
            dropShadowDistance: this.text.dropShadow.distance,
            fill:               this.text.fill.hex,
            font:               `${this.text.font.weight} ${this.text.font.style} ${this.text.font.size}px ${this.text.font.family}`,
            stroke:             this.text.stroke.hex,
            strokeThickness:    this.text.strokeThickness,
            wordWrap:           this.text.wordWrapWidth > 0,
            wordWrapWidth:      this.text.wordWrapWidth
        });
        result.x = -result.width  / 2;
        result.y = -result.height / 2;
        return result;
    }

    makeDisplayObject(nodeObj, graphicalComponent) {
        const container = this.makeContainer();
        const sprite    = Utils.makeCanvasSprite(container, {
            width:  this.width,
            height: this.height
        });
        console.log(sprite.width)
        return sprite;
    }
}

IllustratedStyle.default = {
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