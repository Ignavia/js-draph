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
     * The drop shadow to apply to nodes. Set the distance to 0 to disable it.
     *
     * @type {Object}
     */
    nodeDropShadow: {

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
        distance: 5,
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
        autoResize: true,
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

    const stage                 = new PIXI.Container();

    const edges                 = new PIXI.Container();
    const selectedEdgeContainer = new PIXI.Container();
    const edgeContainer         = new PIXI.Container();
    edges.addChild(edgeContainer);
    edges.addChild(selectedEdgeContainer);
    stage.addChild(edges);

    const nodes                 = new PIXI.Container();
    const selectedNodeContainer = new PIXI.Container();
    const nodeContainer         = new PIXI.Container();
    nodes.addChild(nodeContainer);
    nodes.addChild(selectedNodeContainer);
    stage.addChild(nodes);

    // Add filters
    selectedNodeContainer.filters = [makeDropShadow(conf, 2)];
    nodeContainer.filters         = [makeDropShadow(conf)];
    selectedEdgeContainer.filters = [makeDropShadow(conf)];

    return {
        renderer: makeRenderer(conf),
        stage,
        selectedNodeContainer,
        nodeContainer,
        selectedEdgeContainer,
        edgeContainer,
    };
}
registry.addGraphStyle("default", makeView);

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
 * @param {Number} factor
 * The factor to multiply the distance and blur values by.
 *
 * @return {Filter}
 * The created filter.
 */
function makeDropShadow(conf, factor = 1) {
    const dropShadow    = new PIXI.filters.DropShadowFilter();
    dropShadow.color    = conf.nodeDropShadow.color.hex;
    dropShadow.alpha    = conf.nodeDropShadow.color.alpha;
    dropShadow.angle    = conf.nodeDropShadow.angle;
    dropShadow.blurX    = conf.nodeDropShadow.blur.x * factor;
    dropShadow.blurY    = conf.nodeDropShadow.blur.y * factor;
    dropShadow.distance = conf.nodeDropShadow.distance * factor;
    return dropShadow;
}
