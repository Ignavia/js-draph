import $          from "jquery";
import mousewheel from "jquery-mousewheel";
mousewheel($);

import registry   from "../../registry.js";
import * as utils from "../../utils.js";

/**
 * The default configuration of this behavior.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The zoom factor to apply when the mousewheel is used. When zooming in,
     * the scale of the stage is multiplied by this value, when zooming out,
     * it is divided by it.
     *
     * @type {Number}
     */
    zoomFactor: 1.1,

    /**
     * The maximum x-scale of the stage.
     *
     * @type {Number}
     */
    maxScaleX: 1,

    /**
     * The minimum x-scale of the stage.
     *
     * @type {Number}
     */
    minScaleX: 0.1,

    /**
     * The maximum y-scale of the stage.
     *
     * @type {Number}
     */
    maxScaleY: 1,

    /**
     * The minimum y-scale of the stage.
     *
     * @type {Number}
     */
    minScaleY: 0.1
};

/**
 * Adds this behavior to the given stage and renderer.
 *
 * @param {DisplayObject} stage
 * The stage to scale when zooming.
 *
 * @param {Renderer} renderer
 * The renderer to add the event listener to.
 *
 * @param {Object} [conf]
 * The configuration of this behavior. Check the default configuration for the
 * structure of this document.
 */
export default function addBehavior(stage, renderer, conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    $(renderer.view).mousewheel(e => {
        if (e.deltaY !== 0) {
            zoom(conf, stage, renderer, e.deltaY < 0 ? "out" : "in");
        }
    });
};
registry.addGraphBehavior("zoom", addBehavior);

/**
 * The actual zoom function. It applies the zoom factor and moves the stage to
 * create the illusion that the program zooms onto the mouse pointer.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @param {DisplayObject} stage
 * The display object that is being scaled.
 *
 * @param {Renderer} renderer
 * The renderer used to display the stage.
 *
 * @param {String} direction
 * This is either "in" or "out" and it specifies whether the stage should be
 * shrunk or enlarged.
 */
function zoom(conf, stage, renderer, direction) {
    const sign   = direction === "in" ? 1 : -1,
          factor = conf.zoomFactor**sign;

    if (scaleOutOfBounds(conf, stage, factor)) {
        return;
    }

    const beforeTransform = renderer.plugins.interaction.mouse.getLocalPosition(stage);

    stage.scale.x *= factor;
    stage.scale.y *= factor;

    const afterTransform = {
        x: beforeTransform.x / factor,
        y: beforeTransform.y / factor
    };

    // Move stage to zoom where the mouse pointer is
    stage.position.x += (afterTransform.x - beforeTransform.x) * stage.scale.x;
    stage.position.y += (afterTransform.y - beforeTransform.y) * stage.scale.y;
}

/**
 * Checks if the new scale after applying the zoom factor is out of the bounds
 * specified in the configuration.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @param {DisplayObject} stage
 * The display object that is getting zoomed.
 *
 * @param {Number} factor
 * The zoom factor to apply.
 *
 * @return {Boolean}
 * Whether the new scale would be invalid.
 */
function scaleOutOfBounds(conf, stage, factor) {
    return scaleDimensionOutOfBounds(stage.scale.x * factor, conf.minScaleX, conf.maxScaleX) ||
           scaleDimensionOutOfBounds(stage.scale.y * factor, conf.minScaleY, conf.maxScaleY);
}

/**
 * Checks if the given value is no longer within the given minimum and maximum
 * value.
 *
 * @param {Number} current
 * The current scale in either x- or y-direction.
 *
 * @param {Number} min
 * The minimum acceptable value.
 *
 * @param {Number} max
 * The maximum acceptable value.
 *
 * @return {Boolean}
 * Whether the new scale would be invalid.
 */
function scaleDimensionOutOfBounds(current, min, max) {
    return current < min * 0.99 || current > max * 1.01;
}
