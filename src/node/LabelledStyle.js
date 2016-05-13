import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

export default class LabelledStyle {
    constructor(conf = {}) {
        _.merge(this, LabelledStyle.default, conf);
    }

    makeContainer(conf) {
        const container = new PIXI.Container();
        const label     = this.makeLabel(conf);
        const box       = this.makeBox(label, conf);
        const margin    = this.makeMargin(box, conf);
        container.addChild(margin);
        container.addChild(box);
        container.addChild(label);
        return container;
    }

    makeLabel(conf) {
        const result = new PIXI.Text(conf.label, { // Pull the label out of the conf
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

    makeBox(label, conf) {
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

    makeMargin(box, conf) {
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

    makeDisplayObject(nodeObj, graphicalComponent, conf = LabelledStyle.default) {
        const container = this.makeContainer(conf);
        const sprite    = Utils.makeCanvasSprite(container, {
            width:  conf.width,
            height: conf.height
        });

        sprite.visible = conf.visible;

        // Placing the texture at the origin of the coordinate system of the sprite
        sprite.anchor = {
            x: 0.5,
            y: 0.5
        };

        return sprite;
    }
}

LabelledStyle.default = {
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
        fill: predefinedColors.black,
        font: {
            family: "Arial",
            size:   20,
            style:  "normal",
            weight: "bold"
        },
        stroke:          predefinedColors.white,
        strokeThickness: 0,
        textBaseline:    "center",
        wordWrapWidth:   0
    },

    /**
     * The height of this node. This can either be a number or the string
     * "auto".
     *
     * @type {Number|String}
     */
    height: "auto",

    /**
     * The width of this node. This can either be a number or the string
     * "auto".
     *
     * @type {Number|String}
     */
    width: "auto",

    /**
     * Whether to show the sprite.
     *
     * @type {Boolean}
     */
    visible: true,

    /**
     * Nodes with a higher value are going to be shown on top of others.
     *
     * @type {Number}
     */
    zIndex: 0
};

// TODO: this should have a toJSON method and a fromJSON method (the latter does not need any merge with the default anymore)
