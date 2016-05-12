import _ from "lodash";

import {Vec2}             from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

export default class TriangleStyle {
    constructor(conf = {}) {
        _.merge(this, TriangleStyle.default, conf);
    }

    makeBox(label) {
        const {tip, baseLeft, baseRight} = this.computeVertices();

        const result = new PIXI.Graphics();
        result.lineStyle(this.border.width, this.border.color.hex, this.border.color.alpha);
        result.beginFill(this.backgroundColor.hex, this.backgroundColor.alpha);

        result.moveTo(baseLeft.x,  baseLeft.y);
        result.lineTo(0,           0);
        result.lineTo(baseRight.x, baseRight.y);

        return result;
    }

    makeDisplayObject(nodeObj, graphicalComponent) {
        const container = this.makeBox();
        //const texture   = container.generateTexture(graphicalComponent.canvasRenderer);
        const sprite    = container;//new PIXI.Sprite(texture);

        sprite.visible = this.visibility;

        // Placing the texture at the origin of the coordinate system of the sprite
        sprite.anchor = {
            x: 0.5,
            y: 0.5
        };

        return sprite;
    }

    computeVertices() {
        const {baseLength: b, legLength: l} = this.computeMeasures();
        const h = Math.sqrt(l**2 - (b / 2)**2);

        return {
            tip:       new Vec2(0, 0),
            baseLeft:  new Vec2(-b / 2, h),
            baseRight: new Vec2( b / 2, h),
        };
    }

    computeMeasures() {
        const autoBaseLength = this.measures.baseLength === "auto";
        const autoLegLength  = this.measures.legLength  === "auto";
        const autoTipAngle   = this.measures.tipAngle   === "auto";

        const numberOfUnknowns = (autoBaseLength ? 1 : 0) +
                                 (autoLegLength  ? 1 : 0) +
                                 (autoTipAngle   ? 1 : 0);

        if (numberOfUnknowns > 1) {
            throw new Error("At least two measures must be provided.");
        }

        if (autoBaseLength) {
            return {
                baseLength: this.computeBaseLength(),
                legLength:  this.measures.legLength
            };
        } else if (autoLegLength) {
            return {
                baseLength: this.measures.baseLength,
                legLength:  this.computeLegLength()
            };
        } else {
            return {
                baseLength: this.measures.baseLength,
                legLength:  this.measures.legLength
            };
        }
    }

    computeBaseLength() {
        return 2 * this.measures.legLength * Math.sin(this.measures.tipAngle / 2);
    }

    computeLegLength() {
        return this.measures.baseLength / (2 * Math.sin(this.measures.tipAngle / 2));
    }
}

TriangleStyle.default = {
    backgroundColor: predefinedColors.white,
    border: {
        color: predefinedColors.black,
        width: 2
    },
    measures: {
        tipAngle: Math.PI / 4,
        legLength: "auto",
        baseLength: 15
    },

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