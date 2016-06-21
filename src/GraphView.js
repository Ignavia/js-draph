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

    /**
     * Sets the filter area of the stage.
     */
    setupFilters() {
        this.stage.filterArea = new PIXI.Rectangle(
            0,
            0,
            this.renderer.width,
            this.renderer.height
        );
    }

    /**
     * Draws the nodes of the graph.
     *
     * @param {Map<String, Object>} nodeConfs
     * Maps from node IDs to the configuration of the visualizer.
     *
     * @param {Layout} layout
     * The layout of the graph.
     */
    visualizeNodes(nodeConfs, layout) {
        for (let nodeObj of this.graph.iterNodes()) {
            const conf     = nodeConfs.get(nodeObj.id);
            const position = layout.getPosition(nodeObj);
            this.addNode(nodeObj, conf, position);
        }
    }

    /**
     * Adds the given edge object to the scene.
     *
     * @param {Edge} edgeObj
     * The edge object to add.
     *
     * @param {Object} conf
     * The configuration of the vsualizer.
     *
     * @param {Vec2} position
     * Where to move the created graphic.
     */
    addNode(nodeObj, conf, position) {
        const displayObject = nodeVisualizer(conf);
        displayObject.earlId = nodeObj.id;

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

    /**
     * Removes the node graphic with the given ID from the scene.
     *
     * @param {String} nodeId
     * The ID of the graphic to remove.
     */
    removeNode(nodeId) {
        const nodeG = this.getNodeDisplayObjectById(nodeId);

        this.selectedNodes.delete(nodeId);
        this.nodeContainer.removeChild(nodeG);
        this.selectedNodeContainer.removeChild(nodeG);
        this.nodes.delete(nodeId);
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
     * Selects the given nodes. Those are highlighted afterwards.
     *
     * @param {Set<String>} nodesToSelect
     * The IDs of the nodes to select.
     */
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

    /**
     * Draws the edges of the graph.
     */
    visualizeEdges() {
        for (let edgeObj of this.graph.iterEdges()) {
            this.addEdge(edgeObj);
        }
    }

    /**
     * Adds the given edge object to the scene.
     *
     * @param {Edge} edgeObj
     * The edge object to add.
     */
    addEdge(edgeObj) {
        const conf    = this.edgeConfs.get(edgeObj.id);
        const sourceG = this.nodes.get(edgeObj.sourceId);
        const targetG = this.nodes.get(edgeObj.targetId);

        const displayObject = edgeVisualizer(
            new Vec2(sourceG.x, sourceG.y),
            new Vec2(targetG.x, targetG.y),
            conf
        );
        displayObject.earlId = edgeObj.id;

        this.edgeConfs.set(edgeObj.id, conf);
        this.edges.set(edgeObj.id, displayObject);

        if (this.selectedEdges.has(edgeObj.id)) {
            this.selectedEdgeContainer.addChild(displayObject);
        } else {
            this.edgeContainer.addChild(displayObject);
        }
    }

    /**
     * Removes the edge graphic with the given ID from the scene.
     *
     * @param {String} edgeId
     * The ID of the graphic to remove.
     */
    removeEdge(edgeId) {
        const edgeG = this.getEdgeDisplayObjectById(edgeId);

        this.edgeConfs.delete(edgeId);
        this.selectedEdges.delete(edgeId);
        this.edgeContainer.removeChild(edgeG);
        this.selectedEdgeContainer.removeChild(edgeG);
        this.edges.delete(edgeId);
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

    /**
     * Selects the given edges. Those are highlighted afterwards.
     *
     * @param {Set<String>} edgesToSelect
     * The IDs of the edges to select.
     */
    selectEdges(edgesToSelect) { // deselect selected edges and select the new ones
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

    /**
     * Centers the stage.
     */
    center() {
        const br = this.getBoundingRectangle();
        this.stage.x = (this.renderer.width  - br.minX - br.maxX) / 2 * this.stage.scale.x;
        this.stage.y = (this.renderer.height - br.minY - br.maxY) / 2 * this.stage.scale.y;
    }

    /**
     * Returns the rectangle around the nodes.
     *
     * @return {Object}
     * The bounding rectangle. The top-left corner is (minX, minY) and the
     * bottom-right corner is (maxX, maxY).
     *
     * @private
     */
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

    /**
     * Moves the node graphic with the given ID to the top.
     *
     * @param {String} nodeId
     * The ID of the graphic.
     */
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

    /**
     * Moves the edge graphic with the given ID to the top.
     *
     * @param {String} edgeId
     * The ID of the graphic.
     */
    moveEdgeToTop(edgeId) {
        const edgeG = this.getEdgeDisplayObjectById(edgeId);
        if (this.selectedEdges.has(edgeId)) {
            this.selectedEdgeContainer.removeChild(edgeG);
            this.selectedEdgeContainer.addChild(edgeG);
        } else {
            this.edgeContainer.removeChild(edgeG);
            this.edgeContainer.addChild(edgeG);
        }
    }

    /**
     * Sets the layout of the graph and moves the nodes accordingly.
     *
     * @param {Layout} layout
     * The new layout.
     */
    setLayout(layout) {
        this.stopRenderLoop();

        for (let [id, position] of layout) {
            const nodeG = this.getNodeDisplayObjectById(id);
            nodeG.x = position.x;
            nodeG.y = position.y;
        }

        this.edges.clear();
        this.edgeContainer.removeChildren();
        this.selectedEdgeContainer.removeChildren();
        this.visualizeEdges();

        this.startRenderLoop();
    }

    /**
     * Moves the node graphic with the given ID to the position.
     *
     * @param {String} nodeId
     * The ID of the graphic.
     *
     * @param {Vec2} position
     * Where to move the node.
     */
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

    setStyle() {
        // TODO
    }

    /**
     * Sets the visibility of the node and edge graphics. Only the ones in the
     * given sets are shown afterwards.
     *
     * @param {Set<String>} nodesToKeep
     * The nodes to keep.
     *
     * @param {Set<String>} edgesToKeep
     * The edges to keep.
     */
    filterGraph(nodesToKeep, edgesToKeep) {
        for (let [id, node] of this.nodes) {
            node.visible = nodesToKeep.has(id);
        }

        this.filterEdges(edgesToKeep);
    }

    /**
     * Sets the visibility of the edge graphics. Only the ones in the given set
     * are shown afterwards.
     *
     * @param {Set<String>} edgesToKeep
     * The edges to keep.
     */
    filterEdges(edgesToKeep) {
        for (let [id, edge] of this.edges) {
            edge.visible = edgesToKeep.has(id);
        }
    }

    /**
     * Resets the filters. All node and edge graphics are visible again
     * afterwards.
     */
    resetFilters() {
        this.resetNodeFilter();

        for (let [id, edge] of this.edges) {
            edge.visible = true;
        }
    }

    /**
     * Resets the node filter. All node graphics are visible again afterwards.
     */
    resetNodeFilter() {
        for (let [id, node] of this.nodes) {
            node.visible = true;
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