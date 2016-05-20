import PIXI from "pixi.js";
import $    from "jquery";

import {Vec2} from "@ignavia/ella";

import * as draph from "./draph.js";

export default class GraphView {
    constructor(graphObj, width = screen.width, height = screen.height) {
        const {
            renderer,
            stage,
            nodeContainer,
            edgeContainer
        } = draph.graphVisualizer.makeEnhancedViewWithDefaultConf();

this.renderer = renderer;
this.stage = stage;
this.nodeContainer = nodeContainer;
this.edgeContainer = edgeContainer;

        $("#container").html(renderer.view);

        this.width = width;
        this.height = height;

        this.graph = graphObj;
        this.nodes = new Map();
        this.edges = new Map();

        for (let nodeObj of graphObj.iterNodes()) {
            const displayObject = draph.nodeVisualizer.makeEnhancedSpriteWithDefaultConf();
            this.nodeContainer.addChild(displayObject);
            this.nodes.set(nodeObj.id, displayObject);

            displayObject.x = Math.random() * width;
            displayObject.y = Math.random() * height;
        }
        for (let edgeObj of graphObj.iterEdges()) {
            const source = edgeObj.sourceId;
            const target = edgeObj.targetId;
            const sourcePos = this.nodes.get(source);
            const targetPos = this.nodes.get(target);
            const displayObject = draph.edgeVisualizer.makeEnhancedSpriteWithDefaultConf(
                new Vec2(sourcePos.x, sourcePos.y),
                new Vec2(targetPos.x, targetPos.y)
            );
            this.edgeContainer.addChild(displayObject);
            this.edges.set(edgeObj.id, displayObject);
        }

        if (width !== window.innerWidth || height !== window.innerHeight) {
            this.resize();
        }

        this.animate();
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

    animate() {
        // this is the main render call that makes pixi draw your container and its children.
        this.renderer.render(this.stage);
        //console.log(this.renderer.plugins.interaction.mouse);
        requestAnimationFrame(() => this.animate());
    }

    addNode(visualizer) {

    }

    addEdge() {

    }
}