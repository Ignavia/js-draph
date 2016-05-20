import PIXI from "pixi.js";
import $    from "jquery";

import {Vec2} from "@ignavia/ella";

import * as draph from "./draph.js";

export default class GraphView {
    constructor(graphObj) {
        const {
            renderer,
            stage,
            nodeContainer,
            edgeContainer
        } = draph.graphVisualizer.makeEnhancedViewWithDefaultConf();

        /**
         * The renderer used to draw the stage.
         *
         * @type {Renderer}
         */
        this.renderer = renderer;

        /**
         * The display object to draw with the renderer.
         *
         * @type {DisplayObject}
         */
        this.stage = stage;

        /**
         * The container for the node display objects.
         *
         * @type {DisplayObject}
         */
        this.nodeContainer = nodeContainer;

        /**
         * The container for the edge display object.
         *
         * @type {DisplayObject}
         */
        this.edgeContainer = edgeContainer;

        /**
         * The graph getting displayed.
         *
         * @type {Graph}
         */
        this.graph = graphObj;

        /**
         * Maps from node IDs to their display objects.
         *
         * @type {Map<String, DisplayObject>}
         */
        this.nodes = new Map();

        /**
         * Maps from edge IDs to their display objects.
         *
         * @type {Map<String, DisplayObject>}
         */
        this.edges = new Map();

        this.init();
        this.animate();
    }

    init() {

        // Add view to container
        $("#container").html(this.renderer.view); // TODO: pass id of container as param

        // Nodes
        for (let nodeObj of this.graph.iterNodes()) {
            const displayObject = draph.nodeVisualizer.makeEnhancedSpriteWithDefaultConf();
            this.nodeContainer.addChild(displayObject);
            this.nodes.set(nodeObj.id, displayObject);

            displayObject.x = Math.random() * this.renderer.width;
            displayObject.y = Math.random() * this.renderer.height;
        }

        // Edges
        for (let edgeObj of this.graph.iterEdges()) {
            const sourceG = this.nodes.get(edgeObj.sourceId);
            const targetG = this.nodes.get(edgeObj.targetId);
            const displayObject = draph.edgeVisualizer.makeEnhancedSpriteWithDefaultConf(
                new Vec2(sourceG.x, sourceG.y),
                new Vec2(targetG.x, targetG.y)
            );
            this.edgeContainer.addChild(displayObject);
            this.edges.set(edgeObj.id, displayObject);
        }

        // Resize
        if (this.renderer.width !== window.innerWidth || this.renderer.height !== window.innerHeight) {
            this.resize();
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
        requestAnimationFrame(() => this.animate());
    }
}