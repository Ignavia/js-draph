import {predefinedColors} from "@ignavia/util";
import {Vec2}             from "@ignavia/ella";

import registry   from "../../registry.js";
import * as utils from "../../utils.js";

/**
 * The default configuration of this style.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * How the line should look.
     *
     * @type {Object}
     */
    line: {

        /**
         * The color of the line.
         *
         * @type {Color}
         */
        color: predefinedColors.black,

        /**
         * The width of the line.
         *
         * @type {Number}
         */
        width: 2
    },

    /**
     * Describes the control point position.
     *
     * @type {Object}
     */
    controlPoint: {

        /**
         * You start at the source position and move in a straight line towards
         * the target node. This value describe how far you move along this
         * line, with 0 meaning you are still at the source node and 1 meaning
         * you reached the target node.
         *
         * @type {Number}
         */
        parallel: 0.5,

        /**
         * From the point you reached, you move this amount of pixels
         * perpendicular to the connecting line.
         *
         * @type {Number}
         */
        perpendicular: 20,
    },
};

/**
 * Creates a sprite using the given configuration.
 *
 * @param {Vec2} targetPos
 * The position of the target node.
 *
 * @param {Object} conf
 * Check the documentation of the default configuration for the structure of
 * this object.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export default function makeSprite(targetPos, conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const controlPoint = computeControlPoint(targetPos, conf);

    console.log("test",computeControlPoint(new Vec2(0, 100), conf));
    console.log(controlPoint, targetPos);
    const result = utils.makeQuadraticCurve(
        conf.line,
        new Vec2(0, 0),
        controlPoint,
        targetPos
    );

    result.decalAnchor = computeDecalAnchor(controlPoint, targetPos, conf);
    result.arrow       = computeArrow(controlPoint, targetPos,conf);
    console.log(result.decalAnchor, result.arrow);

    return result;
};
registry.addEdgeLineStyle("quadraticCurve", makeSprite);

function computeControlPoint(targetPos, conf) {
    const parallel      = targetPos.mul(conf.controlPoint.parallel);
    const perpendicular = targetPos.rotate(Math.PI / 2).normalize().mul(conf.controlPoint.perpendicular *  2);
    return parallel.add(perpendicular);
}

function computeDecalAnchor(controlPoint, targetPos, conf) {
    return computePoint(controlPoint, targetPos, 0.5,conf);
}

function computeArrow(controlPoint, targetPos, conf) {
    return {
        anchor: computePoint(controlPoint, targetPos, 0.75, conf),
        angle:  computeAngle(controlPoint, targetPos, 0.75, conf),
    };
}

function computePoint(controlPoint, targetPos, x, conf) {
    const {a, b} = computeCoefficients(conf.controlPoint.parallel, conf.controlPoint.perpendicular);

    const y             = a * x**2 + b * x;
    console.log("a", a, "b", b, "y",y);
    const parallel      = targetPos.mul(x);
    const perpendicular = targetPos.rotate(Math.PI / 2).normalize().mul(y);
    return parallel.add(perpendicular);
}

function computeAngle(controlPoint, targetPos, x,conf) {
    const {a, b} = computeCoefficients(conf.controlPoint.parallel, conf.controlPoint.perpendicular);
    console.log(a,b);
    const slope = 2 * a * x + b;
    return Math.atan(slope);
}

function computeCoefficients(x_cp, y_cp) {
    const a = y_cp / (x_cp**2 - x_cp);
    return {
        a,
        b: -a,
    };
}
