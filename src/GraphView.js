import PIXI from "pixi.js";

import {Vec2}   from "@ignavia/ella";
import {Layout} from "@ignavia/earl";

import {graphVisualizer} from "./graph/graph.js";
import {nodeVisualizer}  from "./node/node.js";
import {edgeVisualizer}  from "./edge/edge.js";

import PolarFisheye     from "./filters/PolarFisheye.js";
import CartesianFisheye from "./filters/CartesianFisheye.js";

export default class GraphView {

    /**
     * @param {Graph} graphObj
     * The graph object to display.
     */
    constructor(graphObj, {
            graphConf = {},
            nodeConfs = new Map(),
            edgeConfs = new Map(),
            layout    = new Layout(),
        } = {}) {

        /**
         * The graph getting displayed.
         *
         * @type {Graph}
         */
        this.graph = graphObj;

        const {
            renderer,
            stage,
            selectedNodeContainer,
            nodeContainer,
            selectedEdgeContainer,
            edgeContainer
        } = graphVisualizer(graphConf);

        /**
         * The renderer used to draw the stage.
         *
         * @type {Renderer}
         * @private
         */
        this.renderer = renderer;

        /**
         * The display object to draw with the renderer.
         *
         * @type {DisplayObject}
         * @private
         */
        this.stage = stage;

        /**
         * The container for selected node display objects.
         *
         * @type {DisplayObject}
         * @private
         */
        this.selectedNodeContainer = selectedNodeContainer;

        /**
         * The container for the node display objects.
         *
         * @type {DisplayObject}
         * @private
         */
        this.nodeContainer = nodeContainer;

        /**
         * The container for selected edge display objects.
         *
         * @type {DisplayObject}
         * @private
         */
        this.selectedEdgeContainer = selectedEdgeContainer;

        /**
         * The container for the edge display object.
         *
         * @type {DisplayObject}
         * @private
         */
        this.edgeContainer = edgeContainer;

        /**
         * Maps from node IDs to their display objects.
         *
         * @type {Map<String, DisplayObject>}
         * @private
         */
        this.nodes = new Map();

        /**
         * Maps from edge IDs to their display objects.
         *
         * @type {Map<String, DisplayObject>}
         * @private
         */
        this.edges = new Map();

        /**
         * A flag whether the render loop is active.
         *
         * @type {Boolean}
         * @private
         */
        this.renderLoopIsActive = false;

        this.init(nodeConfs, edgeConfs, layout);
        this.startRenderLoop();
    }


    init(nodeConfs, edgeConfs, layout) {
        this.setupFilters();
        this.visualizeNodes(nodeConfs, layout);
        this.visualizeEdges(edgeConfs);
    }

    visualizeNodes(nodeConfs, layout) {
        for (let nodeObj of this.graph.iterNodes()) {
            const conf          = nodeConfs.get(nodeObj.id);
            const position      = layout.getPosition(nodeObj);
            const displayObject = nodeVisualizer(conf);
            this.nodeContainer.addChild(displayObject);
            this.nodes.set(nodeObj.id, displayObject);

            if (position) {
                displayObject.x = position.x * this.renderer.width;
                displayObject.y = position.y * this.renderer.height;
            } else {
                displayObject.x = Math.random() * this.renderer.width;
                displayObject.y = Math.random() * this.renderer.height;
            }
        }
    }

    visualizeEdges(edgeConfs) {
        for (let edgeObj of this.graph.iterEdges()) {
            const sourceG = this.nodes.get(edgeObj.sourceId);
            const targetG = this.nodes.get(edgeObj.targetId);
            const conf    = edgeConfs.get(edgeObj.id);
            console.log(sourceG, targetG)
            const displayObject = edgeVisualizer(
                new Vec2(sourceG.x, sourceG.y),
                new Vec2(targetG.x, targetG.y),
                conf
            );
            this.edgeContainer.addChild(displayObject);
            this.edges.set(edgeObj.id, displayObject);
        }
    }

    /**
     * Returns the display object for the given node ID.
     *
     * @param {String} nodeId
     * The ID of the node to get the display object for.
     *
     * @return {DisplayObject}
     * The display object for the node.
     */
    getNodeDisplayObjectById(nodeId) {
        return this.nodes.get(nodeId);
    }

    /**
     * Returns the display object for the given edge ID.
     *
     * @param {String} edgeId
     * The ID of the edge to get the display object for.
     *
     * @return {DisplayObject}
     * The display object for the edge.
     */
    getEdgeDisplayObjectById(edgeId) {
        return this.edges.get(edgeId);
    }

    setupFilters() {
        this.stage.filterArea = new PIXI.Rectangle(
            0,
            0,
            this.renderer.width,
            this.renderer.height
        );
    }

    setEdgeSelection() {

    }

    setNodeSelection() {

    }

    setEdgeFilter() {

    }

    addFilter() {

    }

    resize(width = window.innerWidth, height = window.innerHeight) {
        this.renderer.resize(width, height);
    }

    addNode(visualizer) {

    }

    addEdge() {

    }

    /**
     * Starts the render loop and repeatedly draws the stage.
     */
    animate() {
        this.renderer.render(this.stage);
        if (this.renderLoopIsActive) {
            requestAnimationFrame(() => this.animate());
        }
    }

    startRenderLoop() {
        this.renderLoopIsActive = true;
        this.animate();
    }

    stopRenderLoop() {
        this.renderLoopIsActive = false;
    }
}