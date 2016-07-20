import PIXI from "pixi.js";
import _    from "lodash/fp";

import {Vec2}   from "@ignavia/ella";
import {Layout} from "@ignavia/earl";

import {graphVisualizer} from "./graph/graph.js";
import {nodeVisualizer}  from "./node/node.js";
import {edgeVisualizer}  from "./edge/edge.js";

import CartesianFisheye from "./filters/CartesianFisheye.js";
import PolarFisheye     from "./filters/PolarFisheye.js";

/**
 * The main class of the library.
 */
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
         * The ID of the latest animation frame request.
         *
         * @type {number}
         * @private
         */
        this.renderRequestId = undefined;

        /**
         * The cartesian fisheye filter.
         *
         * @type {CartesianFisheye}
         * @private
         */
        this.cartesianFisheye = new CartesianFisheye();

        /**
         * The polar fisheye filter.
         *
         * @type {PolarFisheye}
         * @private
         */
        this.polarFisheye = new PolarFisheye();

        /**
         * The steepness of the size-scaling curve.
         *
         * @type {number}
         * @private
         */
        this.sizeScalingSteepness = 6;

        /**
         * The midpoint of the size-scaling curve.
         *
         * @type {number}
         * @private
         */
        this.sizeScalingMidpoint = 0.5;

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
     *
     * @param {Layout} layout
     * The layout of the graph.
     */
    init(nodeConfs, edgeConfs, layout) {
        this.setFilterArea();
        this.visualizeNodes(nodeConfs, layout);
        this.visualizeEdges();
    }

    /**
     * Sets the filter area of the stage.
     */
    setFilterArea(width = this.renderer.width, height = this.renderer.height) {
        this.stage.filterArea = new PIXI.Rectangle(
            0,
            0,
            width,
            height
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
     *
     * @private
     */
    visualizeNodes(nodeConfs, layout) {
        for (let nodeObj of this.graph.iterNodes()) {
            const conf     = nodeConfs.get(nodeObj.id);
            const position = layout.getPosition(nodeObj);
            this.addNode(nodeObj, conf, position);
        }
    }

    /**
     * Adds the given node object to the scene.
     *
     * @param {Node} nodeObj
     * The node object to add.
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
        this.storeScale(displayObject);

        if (position) {
            displayObject.x = position.x;
            displayObject.y = position.y;
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
    selectNodes(nodesToSelect) { // TODO: deselect selected nodes and select the new ones
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
     *
     * @private
     */
    visualizeEdges() {
        for (let edgeObj of this.graph.iterEdges()) {
            const conf = this.edgeConfs.get(edgeObj.id);
            this.addEdge(edgeObj, conf);
        }
    }

    /**
     * Adds the given edge object to the scene.
     *
     * @param {Edge} edgeObj
     * The edge object to add.
     *
     * @param {Object} conf
     * The configuration of the visualizer.
     */
    addEdge(edgeObj, conf) {
        const sourceG = this.nodes.get(edgeObj.sourceId);
        const targetG = this.nodes.get(edgeObj.targetId);

        const displayObject = edgeVisualizer(
            new Vec2(sourceG.x, sourceG.y),
            new Vec2(targetG.x, targetG.y),
            conf
        );
        displayObject.earlId = edgeObj.id;
        this.storeScale(displayObject.getArrow());
        this.storeScale(displayObject.getDecal());

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
        this.stage.scale.x = 1;
        this.stage.scale.y = 1;
        this.stage.x = (this.renderer.width  - br.minX - br.maxX) / 2;
        this.stage.y = (this.renderer.height - br.minY - br.maxY) / 2;
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
            if (nodeG) {
                nodeG.x = position.x;
                nodeG.y = position.y;
            }
        }

        this.edges.clear();
        this.edgeContainer.removeChildren();
        this.selectedEdgeContainer.removeChildren();
        this.visualizeEdges();

        this.startRenderLoop();
    }

    /**
     * Configures the cartesian fisheye filter.
     *
     * @param {number} centerHeight
     * The midpoint of the distortion curve.
     *
     * @private
     */
    configureCartesianFisheye(centerHeight) {
        this.cartesianFisheye.centerHeight = centerHeight;
        if (centerHeight === 0.5) {
            this.stage.filters = null;
        } else {
            this.stage.filters = [this.cartesianFisheye];
        }
    }

    /**
     * Configures the polar fisheye filter.
     *
     * @param {number} centerHeight
     * The midpoint of the distortion curve.
     *
     * @param {number} radius
     * The radius of the effect.
     *
     * @private
     */
    configurePolarFisheye(centerHeight, radius) {
        this.polarFisheye.centerHeight = centerHeight;
        this.polarFisheye.radius       = radius;
        if (centerHeight === 0.5) {
            this.stage.filters = null;
        } else {
            this.stage.filters = [this.polarFisheye];
        }
    }

    /**
     * Configures the size scaling.
     *
     * @param {number} mp
     * The midpoint of the curve.
     *
     * @param {number} s
     * The steepness of the curve.
     *
     * @private
     */
    configureSizeScaling(mp, s) {
        this.sizeScalingMidpoint  = mp;
        this.sizeScalingSteepness = s;
        if (s === 0) {
            this.restoreScales();
        }
    }

    /**
     * Restores the original scales of the graphics.
     *
     * @private
     */
    restoreScales() {
        for (let nodeG of this.nodes.values()) {
            this.restoreScale(nodeG);
        }
        for (let edgeG of this.edges.values()) {
            this.restoreScale(edgeG.getArrow());
            this.restoreScale(edgeG.getDecal());
            edgeG.getLine().alpha = 1;
        }
    }

    /**
     * Restores the original scales of the given display object.
     *
     * @param {DisplayObject} displayObject
     * The display object to scale.
     *
     * @private
     */
    restoreScale(displayObject) {
        displayObject.scale.x = displayObject.origScaleX;
        displayObject.scale.y = displayObject.origScaleY;
    }

    /**
     * Saves the current scales of the given display object.
     *
     * @param {DisplayObject} displayObject
     * The display object to snapshot.
     *
     * @private
     */
    storeScale(displayObject) {
        displayObject.origScaleX = displayObject.scale.x;
        displayObject.origScaleY = displayObject.scale.y;
    }

    /**
     * Configures the filters.
     *
     * @param {Object} [options]
     * The options object.
     *
     * @param {number} [options.cartesianFisheyeCenterHeight]
     * The value of the distortion function at x = 0.5. This is the
     * place halfway between the focus point and the border.
     *
     * @param {number} [options.polarFisheyeCenterHeight]
     * the value of the distortion function at x = 0.5. This is the
     * place halfway between the focus point and the border.
     *
     * @param {number} [options.polarFisheyeRadius]
     * The radius of the effect.
     *
     * @param {number} [options.sizeScalingMidpoint]
     * The midpoint of the curve.
     *
     * @param {number} [options.sizeScalingSteepness]
     * The steepness of the curve.
     */
    configureFilters({
        cartesianFisheyeCenterHeight  = this.cartesianFisheye.centerHeight,
        polarFisheyeCenterHeight      = this.polarFisheye.centerHeight,
        polarFisheyeRadius            = this.polarFisheye.radius,
        sizeScalingMidpoint           = this.sizeScalingMidpoint,
        sizeScalingSteepness          = this.sizeScalingSteepness,
    } = {}) {
        this.configureCartesianFisheye(
            cartesianFisheyeCenterHeight
        );
        this.configurePolarFisheye(
            polarFisheyeCenterHeight,
            polarFisheyeRadius
        );
        this.configureSizeScaling(
            sizeScalingMidpoint,
            sizeScalingSteepness
        );
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
        this.setFilterArea(width, height);
    }

    /**
     * Returns the width of the renderer.
     *
     * @return {number}
     * The width of the renderer.
     */
    getWidth() {
        return this.renderer.width;
    }

    /**
     * Returns the height of the renderer.
     *
     * @return {number}
     * The height of the renderer.
     */
    getHeight() {
        return this.renderer.height;
    }

    /**
     * Returns the canvas element used by the renderer.
     *
     * @return {Object}
     * The canvas element.
     */
    getView() {
        return this.renderer.view;
    }

    /**
     * Starts the render loop.
     */
    startRenderLoop() {
        if (!this.renderRequestId) {
            this.animate();
        }
    }

    /**
     * Stops the render loop.
     */
    stopRenderLoop() {
        if (this.renderRequestId) {
            cancelAnimationFrame(this.renderRequestId);
            this.renderRequestId = undefined;
        }
    }

    /**
     * Clamps the global mouse position to the renderer view.
     *
     * @return {Point}
     * The clamped mouse position.
     *
     * @private
     */
    getClampedGlobalMousePosition() {
        const globalPos = this.renderer.plugins.interaction.mouse.global;
        globalPos.x     = _.clamp(0, this.renderer.width,  globalPos.x);
        globalPos.y     = _.clamp(0, this.renderer.height, globalPos.y);
        return globalPos;
    }

    /**
     * Translates the global mouse position to the position on the stage.
     *
     * @return {Vec2}
     * The point on the stage the mouse is on.
     *
     * @private
     */
    getLocalMousePosition() {
        const point = this.renderer.plugins.interaction.mouse.getLocalPosition(
            this.stage,
            undefined,
            this.getClampedGlobalMousePosition()
        );
        return new Vec2(point.x, point.y);
    }

    /**
     * Translates the global mouse position to the position the filters need.
     *
     * @return {Vec2}
     * The mouse position relative to the width and height of the renderer.
     *
     * @private
     */
    getRelativeMousePosition(v) {
        const globalPos = this.getClampedGlobalMousePosition();
        return new Vec2(
            (globalPos.x) / this.renderer.width,
            (globalPos.y) / this.renderer.height
        );
    }

    /**
     * The result and every larger length is regarded as 1 when distorting it.
     *
     * @return {Vec2}
     * The maximum distance.
     *
     * @private
     */
    computeMaximumDistance() {
        return new Vec2(
            this.renderer.width  / this.stage.scale.x,
            this.renderer.height / this.stage.scale.y
        ).length();
    }

    /**
     * Computes the distorting (scaling, transparency) based on the given
     * distance.
     *
     * @param {number} distance
     * The distance. This value is clamped to the range [0, 1].
     *
     * @return {number}
     * The suggested distortion. This is a value between 0 and 1.
     */
    distort(distance) {
        distance = _.clamp(0, 1, distance);
        const f  = distance => 1 / (1 + Math.exp(-this.sizeScalingSteepness * (this.sizeScalingMidpoint - distance)));
        return (f(distance) - f(1)) / (f(0) - f(1));
    }

    /**
     * Computes the distortion of the given display object.
     *
     * @param {DisplayObject} displayObject
     * Th display object to use.
     *
     * @param {Vec2} mousePos
     * Where the mouse pointer is.
     *
     * @param {number} maximumDistance
     * Everything larger than this is regarded as distance 1.
     */
    computeDistortion(displayObject, mousePos, maximumDistance) {
        const pos      = displayObject.position;
        const distance = mousePos.sub(pos).length() / maximumDistance;
        return this.distort(distance);
    }

    /**
     * Uses the given distortion value to set the x- and y-scale of the
     * display object.
     *
     * @param {DisplayObject} displayObject
     * The display object to scale.
     *
     * @param {number} distortion
     * The computed distortion.
     */
    distortScale(displayObject, distortion) {
        displayObject.scale.x = displayObject.origScaleX * distortion / this.stage.scale.x;
        displayObject.scale.y = displayObject.origScaleY * distortion / this.stage.scale.y;
    }

    /**
     * Scales the display objects based on their distance to the mouse pointer.
     */
    scaleDisplayObjects() { // TODO check if visible/world visible
        const mousePos        = this.getLocalMousePosition();
        const maximumDistance = this.computeMaximumDistance();

        for (let nodeG of this.nodes.values()) {
            const distortion = this.computeDistortion(nodeG, mousePos, maximumDistance);
            this.distortScale(nodeG, distortion);
        }

        for (let edgeG of this.edges.values()) {
            const edgePos = new Vec2(edgeG.x, edgeG.y);

            const arrowG          = edgeG.getArrow();
            const arrowDistortion = this.computeDistortion(arrowG, mousePos.sub(edgePos), maximumDistance);
            this.distortScale(arrowG, arrowDistortion);

            const decalG          = edgeG.getDecal();
            const decalDistortion = this.computeDistortion(decalG, mousePos.sub(edgePos), maximumDistance);
            this.distortScale(decalG, decalDistortion);

            const edgeObj          = this.graph.getEdgeById(edgeG.earlId);
            const sourceG          = this.getNodeDisplayObjectById(edgeObj.sourceId);
            const targetG          = this.getNodeDisplayObjectById(edgeObj.targetId);
            const sourceDistortion = this.computeDistortion(sourceG, mousePos, maximumDistance);
            const targetDistortion = this.computeDistortion(targetG, mousePos, maximumDistance);
            edgeG.getLine().alpha = Math.max(
                arrowDistortion,
                decalDistortion,
                sourceDistortion,
                targetDistortion
            );
        }
    }

    /**
     * Repeatedly draws the stage.
     *
     * @private
     */
    animate() {
        this.cartesianFisheye.focus = this.getRelativeMousePosition();
        this.polarFisheye.focus     = this.getRelativeMousePosition();

        if (this.sizeScalingSteepness !== 0) {
            this.scaleDisplayObjects();
        }

        this.renderer.render(this.stage);
        this.renderRequestId = requestAnimationFrame(() => this.animate());
    }
}