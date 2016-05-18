import _ from "lodash";

import {predefinedColors} from "@ignavia/util";
import {Vec2}             from "@ignavia/ella";

import * as Utils from "../../Utils.js";

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
     * Where to position the decal. Set this to "auto" to automatically determine
     * it based on the source and target positions.
     *
     * @type {Vec2|Vec2Builder|String}
     */
    decalAnchor: "auto"
};

/**
 * Creates a sprite using the given configuration.
 *
 * @param {Object} conf
 * Check the documentation of the default configuration for the structure of
 * this object.
 *
 * @param {Vec2|Vec2Builder} sourcePos
 * The position of the source node.
 *
 * @param {Vec2|Vec2Builder} targetPos
 * The position of the target node.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export const makeSprite = _.curry(function (conf, sourcePos, targetPos) {
    const centerX = (sourcePos.x + targetPos.x) / 2;
    const centerY = (sourcePos.y + targetPos.y) / 2;

    const line = Utils.makeLine(conf.line, {
        x: sourcePos.x - centerX,
        y: sourcePos.y - centerY
    }, {
        x: targetPos.x - centerX,
        y: targetPos.y - centerY
    });

    const result  = Utils.makeCanvasSprite(line);

    // Placing the sprite between the two nodes
    result.x = centerX;
    result.y = centerY;
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    if (conf.decalAnchor === "auto") {
        result.decalAnchor = new Vec2(centerX, centerY);
    } else {
        result.decalAnchor = conf.decalAnchor;
    }

    return result;
});

/**
 * Creates a sprite using the default configuration.
 *
 * @param {Vec2|Vec2Builder} sourcePos
 * The position of the source node.
 *
 * @param {Vec2|Vec2Builder} targetPos
 * The position of the target node.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export const makeSpriteWithDefaultConf = makeSprite(defaultConf);
