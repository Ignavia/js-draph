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
    const f            = computeFunction(controlPoint, targetPos);
    const df           = computeDerivative(controlPoint, targetPos);

    const result = utils.makeQuadraticCurve(
        conf.line,
        new Vec2(0, 0),
        controlPoint,
        targetPos
    );
    result.decal = computeAnchorAndAngle(f, df, 0.5);
    result.arrow = computeAnchorAndAngle(f, df, 0.75);

    return result;
};
registry.addEdgeLineStyle("quadratic", makeSprite);

function computeControlPoint(targetPos, conf) {
    const parallel      = targetPos.mul(conf.controlPoint.parallel);
    const perpendicular = targetPos.rotate(Math.PI / 2).normalize().mul(conf.controlPoint.perpendicular);
    return parallel.add(perpendicular);
}

function computeFunction(p1, p2) {
    return t => {
        const a = p2.sub(p1.mul(2));
        const b = p1.mul(2);
        return a.mul(t**2).add(b.mul(t));
    };
}

function computeDerivative(p1, p2) {
    return t => {
        const a = p2.mul(2).sub(p1.mul(4));
        const b = p1.mul(2);
        return a.mul(t).add(b);
    }
}

function computeAnchorAndAngle(f, df, t) {
    const slope = df(t);
    return {
        anchor: f(t),
        angle:  Math.atan2(slope.y, slope.x),
    };
}
