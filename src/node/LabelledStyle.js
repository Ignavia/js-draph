import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import Style from "./Style.js";

export default class LabelledStyle extends Style {
    constructor(conf = {}) {
        super();
        _.merge(this, LabelledStyle.default, conf);
    }

    makeContainer() {
        const container = new PIXI.Container();
        const label     = this.makeLabel();
        const box       = this.makeBox(label);
        const margin    = this.makeMargin(box);
        container.addChild(margin);
        container.addChild(box);
        container.addChild(label);
        return container;
    }

    makeLabel() {
        const result = new PIXI.Text(this.label, {
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

    makeBox(label) {
        const result = new PIXI.Graphics();
        result.lineStyle(this.border.width, this.border.color.hex, this.border.color.alpha);
        result.beginFill(this.backgroundColor.hex, this.backgroundColor.alpha);

        if (this.shape === "circle") {
            result.drawCircle(
                0,
                0,
                Math.max(label.width, label.height) / 2 + this.padding
            );
        } else if (this.shape === "ellipse") {
            result.drawEllipse(
                0,
                0,
                label.width  / Math.sqrt(2) + this.padding,
                label.height / Math.sqrt(2) + this.padding
            );
        } else if (this.shape === "rect") {
            result.drawRect(
                -label.width  / 2 -     this.padding,
                -label.height / 2 -     this.padding,
                 label.width      + 2 * this.padding,
                 label.height     + 2 * this.padding
            );
        } else if (this.shape === "roundedRect") {
            result.drawRoundedRect(
                -label.width  / 2 -     this.padding,
                -label.height / 2 -     this.padding,
                 label.width      + 2 * this.padding,
                 label.height     + 2 * this.padding,
                this.border.radius
            );
        }

        return result;
    }

    makeMargin(box) {
        const result = new PIXI.Graphics();
        result.beginFill(predefinedColors.transparent.hex, predefinedColors.transparent.alpha);
        result.drawRect(
            -box.width  / 2 -     this.margin,
            -box.height / 2 -     this.margin,
             box.width      + 2 * this.margin,
             box.height     + 2 * this.margin
        );
        return result;
    }

    makeDisplayObject(nodeObj, graphicalComponent) {
        const container = this.makeContainer();
        const texture   = container.generateTexture(graphicalComponent.canvasRenderer);
        const sprite    = new PIXI.Sprite(texture);

        if (this.width !== "auto") {
            sprite.width = this.width;
        }
        if (this.height !== "auto") {
            sprite.height = this.height;
        }

        sprite.visible = this.visibility;

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
                size:   12,
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
        visibility: true,

        /**
         * Nodes with a higher value are going to be shown on top of others.
         *
         * @type {Number}
         */
        zIndex: 0
};

// TODO: this should have a toJSON method and a fromJSON method (the latter does not need any merge with the default anymore)
