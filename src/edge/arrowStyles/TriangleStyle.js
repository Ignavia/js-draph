import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

export default class TriangleStyle {
    constructor(conf = {}) {
        _.merge(this, TriangleStyle.default, conf);
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
        const sprite    = container;//new PIXI.Sprite(texture);

        sprite.visible = this.visibility;

        // Placing the texture at the origin of the coordinate system of the sprite
        sprite.anchor = {
            x: 0.5,
            y: 0.5
        };

        return sprite;
    }

    computeMeasures() {
        const autoBaseLength = this.measures.baseLength === "auto";
        const autoLegLength  = this.measures.legLength  === "auto";
        const autoTipAngle   = this.measures.tipAngle   === "auto";

        const numberOfUnknowns = (autoBaseLength ? 1 : 0) +
                                 (autoLegLength  ? 1 : 0) +
                                 (autoTipAngle   ? 1 : 0);

        if (numberOfUnknowns !== 1) {
            throw new Error(`Exactly one measure must be set to "auto".`);
        }

        if (autoBaseLength) {
            return {
                baseLength: this.computeBaseLength(),
                legLength:  this.measures.legLength,
                tipAngle:   this.measures.tipAngle
            };
        } else if (autoLegLength) {
            return {
                baseLength: this.measures.baseLength,
                legLength:  this.computeLegLength(),
                tipAngle:   this.measures.tipAngle
            };
        } else {
            return {
                baseLength: this.measures.baseLength,
                legLength:  this.measures.legLength,
                tipAngle:   this.computeTipAngle()
            };
        }
    }

    computeBaseLength() {
        return 2 * this.measures.legLength * Math.sin(this.measures.tipAngle / 2);
    }

    computeLegLength() {
        return this.measures.baseLength / (2 * Math.sin(this.measures.tipAngle / 2));
    }

    computeTipAngle() {
        return 2 * Math.asin(this.measures.baseLength / (2 * this.measures.legLength));
    }
}

TriangleStyle.default = {
    backgroundColor: predefinedColors.white,
    border: {
        color:    predefinedColors.black,
        radius:   5,
        width:    2,
        showBase: false
    },
    measures: {
        tipAngle: Math.PI / 4,
        legLength: "auto",
        baseLength: 10
    }

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