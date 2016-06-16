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
     *
     * @param {Object} options
     * The options object.
     *
     * @param {Object} options.graphConf
     * The configuration of the graph visualizer.
     *
     * @param {Map<String, Object>} options.nodeConfs
     * Maps from node IDs to the configuration of the visualizer.
     *
     * @param {Map<String, Object>} options.edgeConfs
     * Maps from edge IDs to the configuration of the visualizer.
     *
     * @param {Layout} layout
     * The layout of the graph.
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
         * @private
         */
        this.graph = graphObj;

        /**
         * The configuration of the edge visualizers.
         *
         * @type {Map<String, Object>}
         * @private
         */
        this.edgeConfs = edgeConfs;

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
         * The IDs of the selected nodes.
         *
         * @type {Set<String>}
         */
        this.selectedNodes = new Set();

        /**
         * Maps from edge IDs to their display objects.
         *
         * @type {Map<String, DisplayObject>}
         * @private
         */
        this.edges = new Map();

        /**
         * The IDs of the selected edges.
         *
         * @type {Set<String>}
         */
        this.selectedEdges = new Set();

        /**
         * A flag whether the render loop is active.
         *
         * @type {Boolean}
         * @private
         */
        this.renderLoopIsActive = false;

        this.init(nodeConfs, edgeConfs, layout);
    }

    /**
     * Draws the graph and starts the render loop.
     *
     * @param {Map<String, Object>} nodeConfs
     * Maps from node IDs to the configuration of the visualizer.
     *
     * @param {Map<String, Object>} edgeConfs
     * Maps from edge IDs to the configuration of the visualizer.
     */
    init(nodeConfs, edgeConfs, layout) {
        this.setupFilters();
        this.visualizeNodes(nodeConfs, layout);
        this.visualizeEdges();
        this.center();
        this.startRenderLoop();
    }

    setupFilters() {
        this.stage.filterArea = new PIXI.Rectangle(
            0,
            0,
            this.renderer.width,
            this.renderer.height
        );
    }

    visualizeNodes(nodeConfs, layout) {
        for (let nodeObj of this.graph.iterNodes()) {
            const conf     = nodeConfs.get(nodeObj.id);
            const position = layout.getPosition(nodeObj);
            this.addNode(nodeObj, conf, position);
        }
    }

    addNode(nodeObj, conf, position) {
        const displayObject = nodeVisualizer(conf);

        if (position) {
            displayObject.x = position.x * this.renderer.width;
            displayObject.y = position.y * this.renderer.height;
        } else {
            displayObject.x = Math.random() * this.renderer.width;
            displayObject.y = Math.random() * this.renderer.height;
        }

        this.nodes.set(nodeObj.id, displayObject);

        if (this.selectedNodes.has(nodeObj.id)) {
            this.selectedNodeContainer.addChild(displayObject);
        } else {
            this.nodeContainer.addChild(displayObject);
        }
    }

    removeNode(id) {
        const nodeG = this.getNodeDisplayObjectById(id);

        this.selectedNodes.delete(id);
        this.nodeContainer.removeChild(nodeG);
        this.selectedNodeContainer.removeChild(nodeG);
        this.nodes.delete(id);
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

    selectNodes(nodesToSelect) { // deselect selected nodes and select the new ones
        for (let [id, node] of this.nodes) {
            if (nodesToSelect.has(id)) {
                this.nodeContainer.removeChild(node);
                this.selectedNodeContainer.addChild(node);
            } else {
                this.selectedNodeContainer.removeChild(node);
                this.nodeContainer.addChild(node);
            }
        }

        this.selectedNodes = nodesToSelect;
    }

    visualizeEdges() {
        for (let edgeObj of this.graph.iterEdges()) {
            this.addEdge(edgeObj);
        }
    }

    addEdge(edgeObj) {
        const conf    = this.edgeConfs.get(edgeObj.id);console.log(edgeObj.id, conf)
        const sourceG = this.nodes.get(edgeObj.sourceId);
        const targetG = this.nodes.get(edgeObj.targetId);

        const displayObject = edgeVisualizer(
            new Vec2(sourceG.x, sourceG.y),
            new Vec2(targetG.x, targetG.y),
            conf
        );

        this.edgeConfs.set(edgeObj.id, conf);
        this.edges.set(edgeObj.id, displayObject);

        if (this.selectedEdges.has(edgeObj.id)) {
            this.selectedEdgeContainer.addChild(displayObject);
        } else {
            this.edgeContainer.addChild(displayObject);
        }
    }

    removeEdge(id) {
        const edgeG = this.getEdgeDisplayObjectById(id);

        this.edgeConfs.delete(id);
        this.selectedEdges.delete(id);
        this.edgeContainer.removeChild(edgeG);
        this.selectedEdgeContainer.removeChild(edgeG);
        this.edges.delete(id);
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

    selectEdges(edgesToSelect) { // deselect selected nodes and select the new ones
        for (let [id, edge] of this.edges) {
            if (edgesToSelect.has(id)) {
                this.edgeContainer.removeChild(edge);
                this.selectedEdgeContainer.addChild(edge);
            } else {
                this.selectedEdgeContainer.removeChild(edge);
                this.edgeContainer.addChild(edge);
            }
        }
        this.selectedEdges = edgesToSelect;
    }

    center() {
        const boundingRectangle = this.getBoundingRectangle();
        const nodeCenterX       = (boundingRectangle.minX + boundingRectangle.maxX) / 2;
        const nodeCenterY       = (boundingRectangle.minY + boundingRectangle.maxY) / 2;

        const renderCenterX = this.renderer.width  / 2;
        const renderCenterY = this.renderer.height / 2;

        // TODO move stage to rendercenter
    }

    getBoundingRectangle() {
        const result = {
            minX: Number.POSITIVE_INFINITY,
            maxX: Number.NEGATIVE_INFINITY,
            minY: Number.POSITIVE_INFINITY,
            maxY: Number.NEGATIVE_INFINITY,
        };

        for (let [, node] of this.nodes) {
            if (node.visible) {
                result.minX = Math.min(result.minX, node.x);
                result.maxX = Math.max(result.maxX, node.x);
                result.minY = Math.min(result.minY, node.y);
                result.maxY = Math.max(result.maxY, node.y);
            }
        }

        return result;
    }

    moveNodeToTop(nodeId) {
        const nodeG = this.getNodeDisplayObjectById(nodeId);
        if (this.selectedNodes.has(nodeId)) {
            this.selectedNodeContainer.removeChild(nodeG);
            this.selectedNodeContainer.addChild(nodeG);
        } else {
            this.nodeContainer.removeChild(nodeG);
            this.nodeContainer.addChild(nodeG);
        }
    }

    setLayout(layout) {
        for (let [id, position] of layout) {
            const nodeG = this.getNodeDisplayObjectById(id);
            nodeG.x = position.x;
            nodeG.y = position.y;
        }

        this.edges.clear();
        this.edgeContainer.removeChildren();
        this.selectedEdgeContainer.removeChildren();
        this.visualizeEdges();
    }

    setStyle() {
        // TODO, redraw everything in the confs
    }

    moveNode(nodeId, position) {
        const nodeG = this.getNodeDisplayObjectById(nodeId);
        nodeG.x = position.x;
        nodeG.y = position.y;

        const nodeObj = this.graph.getNodeById(nodeId);
        for (let edgeId of nodeObj.iterIncidentEdges()) {
            const edgeG   = this.getEdgeDisplayObjectById(edgeId);
            const edgeObj = this.graph.getEdgeById(edgeId);

            this.edges.delete(edgeId);
            this.edgeContainer.removeChild(edgeG);
            this.selectedEdgeContainer.removeChild(edgeG);
            this.addEdge(edgeObj);
        }
    }

    filterGraph(nodesToKeep, edgesToKeep) {
        for (let [id, node] of this.nodes) {
            node.visible = nodesToKeep.has(id);
        }

        this.filterEdges(edgesToKeep);
    }

    filterEdges(edgesToKeep) {
        for (let [id, edge] of this.edges) {
            edge.visible = edgesToKeep.has(id);
        }
    }

    /**
     * Resizes the renderer.
     *
     * @param {Number} width
     * The new width.
     *
     * @param {Number} height
     * The new height.
     */
    resize(width, height) {
        this.renderer.resize(width, height);
    }

    /**
     * Starts the render loop.
     */
    startRenderLoop() {
        this.renderLoopIsActive = true;
        this.animate();
    }

    /**
     * Stops the render loop.
     */
    stopRenderLoop() {
        this.renderLoopIsActive = false;
    }

    /**
     * Repeatedly draws the stage.
     *
     * @private
     */
    animate() {
        this.renderer.render(this.stage);
        if (this.renderLoopIsActive) {
            requestAnimationFrame(() => this.animate());
        }
    }
}