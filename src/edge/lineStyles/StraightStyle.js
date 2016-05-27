import _ from "lodash";

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
     * Where to position the decal. Set this to "auto" to automatically determine
     * it based on the source and target positions.
     *
     * @type {Vec2|String}
     */
    decalAnchor: "auto"

    // TODO: arrowAnchor (orientation and position)
};

/**
 * Creates a sprite using the given configuration.
 *
 * @param {Object} conf
 * Check the documentation of the default configuration for the structure of
 * this object.
 *
 * @param {Vec2} sourcePos
 * The position of the source node.
 *
 * @param {Vec2} targetPos
 * The position of the target node.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export const makeSprite = _.curry(function (conf, sourcePos, targetPos) {
    const line   = utils.makeLine(conf.line, sourcePos, targetPos);
    const result = utils.makeCanvasSprite(line);

    // Placing the sprite between the two nodes
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    if (conf.decalAnchor === "auto") {
        result.decalAnchor = new Vec2(0, 0);
    } else {
        result.decalAnchor = conf.decalAnchor;
    }

    return result;
});
makeSprite.path = ["edge", "lineStyle", "straight"];
registry.add(makeSprite.path, makeSprite);

/**
 * Creates a sprite using the default configuration.
 *
 * @param {Vec2} sourcePos
 * The position of the source node.
 *
 * @param {Vec2} targetPos
 * The position of the target node.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export const makeSpriteWithDefaultConf = makeSprite(defaultConf);
makeSpriteWithDefaultConf.path = ["edge", "lineStyle", "straightDefault"];
registry.add(makeSpriteWithDefaultConf.path, makeSpriteWithDefaultConf);