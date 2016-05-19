import _ from "lodash";

import * as Utils from "../Utils.js";

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
    handleMouseover:() => { console.log("Mouseover"); },

    /**
     * Is triggered when the mouse leaves the display object.
     *
     * @type {Function}
     */
    handleMouseout: () => { console.log("Mouseout"); },

    /**
     * Is triggered when the left mousebutton is pressed when the mouse is on
     * the display object.
     *
     * @type {Function}
     */
    handleMousedown: () => { console.log("Mousedown"); },

    /**
     * Is triggered when the left mousebutton is released when the mouse is on
     * the display object.
     *
     * @type {Function}
     */
    handleMouseup: () => { console.log("Mouseup"); },

    /**
     * Is triggered right after the mouseup event.
     *
     * @type {Function}
     */
    handleClick: () => { console.log("Click"); },

    /**
     * Is triggered when the display object is touched.
     *
     * @type {Function}
     */
    handleTouchstart: () => { console.log("Touchstart"); },

    /**
     * Is triggered when the display object is no longer touched.
     *
     * @type {Function}
     */
    handleTouchend: () => { console.log("Touchend"); },

    /**
     * Is triggered right after the touchend event.
     *
     * @type {Function}
     */
    handleTap: () => { console.log("Tap"); },
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
export const addBehavior = Utils.addInteraction;

/**
 * Adds the default event handlers to the given display object.
 *
 * @param {DisplayObject} displayObject
 * The display object to make interactive.
 */
export const addBehaviorWithDefaultConf = addBehavior(defaultConf);
