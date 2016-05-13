import _ from "lodash";

import {Vec2}             from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

export default class TriangleStyle {
    constructor(conf = {}) {
        _.merge(this, TriangleStyle.default, conf);
    }

    makeBox(conf) {
        const {tip, baseLeft, baseRight} = this.computeVertices(conf);

        const result = new PIXI.Graphics();
        result.lineStyle(conf.border.width, conf.border.color.hex, conf.border.color.alpha);
        result.beginFill(conf.backgroundColor.hex, conf.backgroundColor.alpha);

        result.moveTo(baseLeft.x,  baseLeft.y);
        result.lineTo(0,           0);
        result.lineTo(baseRight.x, baseRight.y);

        return result;
    }

    makeDisplayObject(nodeObj, graphicalComponent, conf = TriangleStyle.default) {
        const container = this.makeBox(conf);
        //const texture   = container.generateTexture(graphicalComponent.canvasRenderer);
        const sprite    = container;//new PIXI.Sprite(texture);

        sprite.visible = conf.visibility;

        // Placing the texture at the origin of the coordinate system of the sprite
        sprite.anchor = {
            x: 0.5,
            y: 0.5
        };

        return sprite;
    }

    computeVertices(conf) {
        const {baseLength: b, legLength: l} = this.computeMeasures(conf);
        const h = Math.sqrt(l**2 - (b / 2)**2);

        return {
            tip:       new Vec2(0, 0),
            baseLeft:  new Vec2(-b / 2, h),
            baseRight: new Vec2( b / 2, h),
        };
    }

    computeMeasures(conf) {
        const autoBaseLength = conf.measures.baseLength === "auto";
        const autoLegLength  = conf.measures.legLength  === "auto";
        const autoTipAngle   = conf.measures.tipAngle   === "auto";

        const numberOfUnknowns = (autoBaseLength ? 1 : 0) +
                                 (autoLegLength  ? 1 : 0) +
                                 (autoTipAngle   ? 1 : 0);

        if (numberOfUnknowns > 1) {
            throw new Error("At least two measures must be provided.");
        }

        if (autoBaseLength) {
            return {
                baseLength: this.computeBaseLength(conf),
                legLength:  conf.measures.legLength
            };
        } else if (autoLegLength) {
            return {
                baseLength: conf.measures.baseLength,
                legLength:  this.computeLegLength(conf)
            };
        } else {
            return {
                baseLength: this.measures.baseLength,
                legLength:  conf.measures.legLength
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