import {Vec2}             from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

import registry   from "../../registry.js";
import * as utils from "../../utils.js";

/**
 * The default configuration of this style.
 */
export const defaultConf = {

    /**
     * The background color of the stage.
     *
     * @type {Color}
     */
    backgroundColor: predefinedColors.white,

    /**
     * The drop shadow to apply. Set to distance to 0 to disable it.
     *
     * @type {Object}
     */
    dropShadow: {

        /**
         * The angle of the drop shadow in radians.
         *
         * @type {Number}
         */
        angle: Math.PI / 4,

        /**
         * The blur to apply to the drop shadow.
         *
         * @type {Vec2}
         */
        blur: new Vec2(4, 4),

        /**
         * The color of the drop shadow.
         *
         * @type {Color}
         */
        color: predefinedColors.gray,

        /**
         * How long the drop shadow is.
         *
         * @type {Number}
         */
        distance: 5
    },

    /**
     * Configures the renderer to use.
     *
     * @type {Object}
     */
    renderer: {

        /**
         * The width of the renderer.
         *
         * @type {Number}
         */
        width: screen.width,

        /**
         * The height of the renderer.
         *
         * @type {Number}
         */
        height: screen.height,

        /**
         * The type of the renderer. Use "auto" to use WebGL if available and
         * canvas otherwise or set this directly to "webGL" or "canvas".
         *
         * @type {String}
         */
        type: "auto",

        /**
         * The resolution to use.
         *
         * @type {Number}
         */
        resolution: window.devicePixelRatio || 1,

        /**
         * Whether to automatically resize the renderer.
         *
         * @type {Boolean}
         */
        autoResize: true
    }
};

/**
 * Creates renderer, stage, nodeContainer and edgeContainers based on the
 * default confguration. All those are bundled in an object and returned.
 *
 * @param {Object} [conf]
 * The configuration to use.
 *
 * @return {Object}
 * The created object.
 */
export default function makeView(conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const stage         = new PIXI.Container();
    const nodeContainer = new PIXI.Container();
    const edgeContainer = new PIXI.Container();
    stage.addChild(edgeContainer);
    stage.addChild(nodeContainer);

    // Add filters
    nodeContainer.filters = [makeDropShadow(conf)];

    return {
        renderer: makeRenderer(conf),
        stage,
        nodeContainer,
        edgeContainer
    };
}
makeView.path = ["graph", "style"];
registry.add(makeView.path, makeView);

/**
 * Creates a renderer using the given configuration.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @return {Renderer}
 * The created renderer.
 */
function makeRenderer(conf) {
    switch (conf.renderer.type) {
    case "auto":
        return makeAutoDetectedRenderer(conf);
    case "webGL":
        return makeWebGLRenderer(conf);
    case "canvas":
        return makeCanvasRenderer(conf);
    }
}

/**
 * Creates a WebGL renderer if available, otherwise a canvas renderer.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @return {Renderer}
 * The created renderer.
 */
function makeAutoDetectedRenderer(conf) {
    return PIXI.autoDetectRenderer(conf.renderer.width, conf.renderer.height, {
        autoResize:      conf.renderer.autoResize,
        resolution:      conf.renderer.resolution,
        backgroundColor: conf.backgroundColor.hex
    });
}

/**
 * Creates a WebGL renderer using the given configuration.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @return {Renderer}
 * The created renderer.
 */
function makeWebGLRenderer(conf) {
    return new PIXI.WebGLRenderer(conf.renderer.width, conf.renderer.height, {
        autoResize:      conf.renderer.autoResize,
        resolution:      conf.renderer.resolution,
        backgroundColor: conf.backgroundColor.hex
    });
}

/**
 * Creates a canvas renderer using the given configuration.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @return {Renderer}
 * The created renderer.
 */
function makeCanvasRenderer(conf) {
    return new PIXI.CanvasRenderer(conf.renderer.width, conf.renderer.height, {
        autoResize:      conf.renderer.autoResize,
        resolution:      conf.renderer.resolution,
        backgroundColor: conf.backgroundColor.hex
    });
}

/**
 * Creates a drop shadow filter based on the given configuration.
 *
 * @param {Object} conf
 * The configuration to use.
 *
 * @return {Filter}
 * The created filter.
 */
function makeDropShadow(conf) {
    const dropShadow    = new PIXI.filters.DropShadowFilter();
    dropShadow.color    = conf.dropShadow.color.hex;
    dropShadow.alpha    = conf.dropShadow.color.alpha;
    dropShadow.angle    = conf.dropShadow.angle;
    dropShadow.blurX    = conf.dropShadow.blur.x;
    dropShadow.blurY    = conf.dropShadow.blur.y;
    dropShadow.distance = conf.dropShadow.distance;
    return dropShadow;
}