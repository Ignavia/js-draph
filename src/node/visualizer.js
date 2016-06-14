import {Vec2} from "@ignavia/ella";

import registry      from "../registry.js";
import * as utils    from "../utils.js";

/**
 * The default configuration of this visualizer.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The configuration of the style to use.
     *
     * @type {Object}
     */
    style: {

        /**
         * The function to call to make the sprite.
         *
         * @type {String}
         */
        type: "simple",

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {}
    },

    /**
     * The configuration of the behaviors to use.
     *
     * @type {Object}
     */
    behaviors: [{

        /**
         * The function to call to add the behavior.
         *
         * @type {String}
         */
        type: "empty",

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {}
    }],

    /**
     * Where to place the sprite.
     *
     * @type {Vec2}
     */
    position: new Vec2(0, 0),

    /**
     * How to scale the sprite. x- and y-scales can be set seperately.
     *
     * @type {Number|Vec2}
     */
    scale: 1,

    /**
     * The point to rotate the display object about.
     *
     * @type {Vec2}
     */
    pivot: new Vec2(0, 0),

    /**
     * The rotation angle of the display object.
     *
     * @type {Number}
     */
    rotation: 0
};

/**
 * Makes a sprite with behavior and positions, rotates and scales it according
 * to the given configuration.
 *
 * @param {Object} [conf]
 * The configuration of the visualizer. Check the default configuration to see
 * the structure of this object.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export default function makeEnhancedSprite(conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const style  = registry.get(["node", "style", conf.style.type]);
    const result = style(conf.style.conf);

    for (let behavior of conf.behaviors) {
        const behaviorFunction = registry.get(["node", "behavior", behavior.type]);
        behaviorFunction(result, behavior.conf);
    }

    utils.setPosition(conf.position, result);
    utils.setScale(conf.scale, result);
    utils.setPivot(conf.pivot, result);
    utils.setRotation(conf.rotation, result);

    return result;
};
