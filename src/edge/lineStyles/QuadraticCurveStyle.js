import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

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
     * Describes the vertex position.
     *
     * @type {Object}
     */
    vertex: {

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

    /**
     * Where to position the decal. Set this to "auto" to automatically determine
     * it based on the source and target positions.
     *
     * @type {Vec2|String}
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
    const parallel      = targetPos.sub(sourcePos).mul(conf.vertex.parallel);
    const perpendicular = parallel.rotate(Math.PI / 2).normalize().mul(conf.vertex.perpendicular);
    const vertex        = sourcePos.add(parallel).add(perpendicular);

    const line = new PIXI.Graphics();
    line.lineStyle(conf.line.width, conf.line.color.hex, conf.line.color.alpha);
    line.moveTo(sourcePos.x - vertex.x, sourcePos.y - vertex.y);
    line.quadraticCurveTo(
        vertex.x,
        vertex.y,
        targetPos.x - vertex.x,
        targetPos.y - vertex.y
    );

    const texture = line.generateTexture(graphicalComponent.canvasRenderer);
    const sprite  = new PIXI.Sprite(texture);

    // Placing the sprite between the two nodes
    sprite.x = vertex.x;
    sprite.y = vertex.y;
    sprite.anchor = {
        x: 0.5, // Problem: 0.5, 0.5 is no longer the correct value
                // I want the anchor to be the place where the decal should be, which is the control point most likely
        y: 0.5
    };

    return sprite;
});

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