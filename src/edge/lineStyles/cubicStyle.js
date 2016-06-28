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
     * Describes the first control point position.
     *
     * @type {Object}
     */
    controlPoint1: {

        /**
         * You start at the source position and move in a straight line towards
         * the target node. This value describe how far you move along this
         * line, with 0 meaning you are still at the source node and 1 meaning
         * you reached the target node.
         *
         * @type {Number}
         */
        parallel: 0.33,

        /**
         * From the point you reached, you move this amount of pixels
         * perpendicular to the connecting line.
         *
         * @type {Number}
         */
        perpendicular: 20,
    },

    /**
     * Describes the second control point position.
     *
     * @type {Object}
     */
    controlPoint2: {

        /**
         * You start at the source position and move in a straight line towards
         * the target node. This value describe how far you move along this
         * line, with 0 meaning you are still at the source node and 1 meaning
         * you reached the target node.
         *
         * @type {Number}
         */
        parallel: 0.66,

        /**
         * From the point you reached, you move this amount of pixels
         * perpendicular to the connecting line.
         *
         * @type {Number}
         */
        perpendicular: -20,
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

    const controlPoint1 = computeControlPoint(targetPos, conf.controlPoint1);
    const controlPoint2 = computeControlPoint(targetPos, conf.controlPoint2);
    const f             = computeFunction(controlPoint1, controlPoint2, targetPos);
    const df            = computeDerivative(controlPoint1, controlPoint2, targetPos);

    const line = utils.makeBezierCurve(
        conf.line,
        new Vec2(0, 0),
        controlPoint1,
        controlPoint2,
        targetPos
    );
    const result = utils.makeCanvasSprite(line);
    result.decal = computePosAndAngle(f, df, 0.5);
    result.arrow = computePosAndAngle(f, df, 0.75);

    return result;
};
registry.addEdgeLineStyle("cubic", makeSprite);

/**
 * Computes the coordinates of the control point in the regular coordinate
 * system.
 *
 * @param {Vec2} targetPos
 * The end point of the line.
 *
 * @param {Object} controlPoint
 * The description of the control point from the configuration.
 */
function computeControlPoint(targetPos, controlPoint) {
    const parallel      = targetPos.mul(controlPoint.parallel);
    const perpendicular = targetPos.rotate(Math.PI / 2).normalize().mul(controlPoint.perpendicular);
    return parallel.add(perpendicular);
}

/**
 * Computes the function of the cubic bezier curve.
 *
 * @param {Vec2} p1
 * The first control point.
 *
 * @param {Vec2} p2
 * The second control point.
 *
 * @param {Vec2} p3
 * The end point.
 */
function computeFunction(p1, p2, p3) {
    const a = p1.mul(3).add(p2.mul(-3)).add(p3);
    const b = p1.mul(-6).add(p2.mul(3));
    const c = p1.mul(3);
    return t => a.mul(t**3).add(b.mul(t**2)).add(c.mul(t));
}

/**
 * Computes the derivative of the function of the cubic bezier curve.
 *
 * @param {Vec2} p1
 * The first control point.
 *
 * @param {Vec2} p2
 * The second control point.
 *
 * @param {Vec2} p3
 * The end point.
 */
function computeDerivative(p1, p2, p3) {
    const a = p1.mul(9).add(p2.mul(-9)).add(p3.mul(3));
    const b = p1.mul(-12).add(p2.mul(6));
    const c = p1.mul(3);
    return t => a.mul(t**2).add(b.mul(t)).add(c);
}

/**
 * Computes the point and slope of the function at the given value.
 *
 * @param {Function} f
 * The function of the curve.
 *
 * @param {Function} df
 * The derivative of the function.
 *
 * @param {Number} t
 * How to move far along the line. 0 represents the start point (0, 0) and 1 is
 * the end point.
 */
function computePosAndAngle(f, df, t) {
    const slope = df(t);
    return {
        pos:   f(t),
        angle: Math.atan2(slope.y, slope.x),
    };
}
