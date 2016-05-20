import _ from "lodash";

import * as utils from "../../utils.js";

/**
 * The default configuration of this behavior.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * Is triggered when the mouse moves onto the display object.
     *
     * @type {Function}
     */
    handleMouseover: () => {},

    /**
     * Is triggered when the mouse leaves the display object.
     *
     * @type {Function}
     */
    handleMouseout: () => {},

    /**
     * Is triggered when the left mousebutton is pressed when the mouse is on
     * the display object.
     *
     * @type {Function}
     */
    handleMousedown: () => {},

    /**
     * Is triggered when the left mousebutton is released when the mouse is on
     * the display object.
     *
     * @type {Function}
     */
    handleMouseup: () => {},

    /**
     * Is triggered right after the mouseup event.
     *
     * @type {Function}
     */
    handleClick: () => {},

    /**
     * Is triggered when the display object is touched.
     *
     * @type {Function}
     */
    handleTouchstart: () => {},

    /**
     * Is triggered when the display object is no longer touched.
     *
     * @type {Function}
     */
    handleTouchend: () => {},

    /**
     * Is triggered right after the touchend event.
     *
     * @type {Function}
     */
    handleTap: () => {},
};

/**
 * Adds event handlers to the given display object.
 *
 * @param {Object} conf
 * Contains the event handlers to add. Check the documentation of the default
 * configuration to see how this object is structured.
 *
 * @param {DisplayObject} displayObject
 * The display object to make interactive.
 */
export const addBehavior = _.curry(function (conf, stage, renderer) {
    utils.addInteraction(conf, stage);
});

/**
 * Adds the default event handlers to the given display object.
 *
 * @param {DisplayObject} displayObject
 * The display object to make interactive.
 */
export const addBehaviorWithDefaultConf = addBehavior(defaultConf);
