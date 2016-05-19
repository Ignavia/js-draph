import PIXI from "pixi.js";

import $          from "jquery";

import * as draph from "./draph.js";

export default class GraphView {
    constructor(graphObj, width = screen.width, height = screen.height) {
        const {
            renderer,
            stage,
            nodeContainer,
            edgeContainer
        } = draph.graphStyle.makeViewWithDefaultConf();

console.log(renderer, stage, nodeContainer, edgeContainer)
this.renderer = renderer;
this.stage = stage;
this.nodeContainer = nodeContainer;
this.edgeContainer = edgeContainer;
        $("#container").html(renderer.view);

        $(renderer.view).mousedown((e) => {
            this.lastPos = {x: e.offsetX, y: e.offsetY};
        }).mouseup((e) => {
            this.lastPos = undefined;
        }).mousemove((e) => {
            if (this.lastPos) {
                this.stage.x += e.offsetX - this.lastPos.x;
                this.stage.y += e.offsetY - this.lastPos.y;
                this.lastPos = {x: e.offsetX, y: e.offsetY};
            }
        }).mouseleave((e) => {
            this.lastPos = undefined;
        });

        this.width = width;
        this.height = height;

        this.graph = graphObj;
        this.nodes = new Map();
        this.edges = new Map();

        for (let nodeObj of graphObj.iterNodes()) {
            const displayObject = draph.nodeVisualizer.makeEnhancedSpriteWithDefaultConf();
            console.log(displayObject)
            this.nodeContainer.addChild(displayObject);
            this.nodes.set(nodeObj.id, displayObject);
        }
        // for (let edgeObj of graphObj.iterEdges()) {
        //     const displayObject = draph.EdgeVisualizer.makeEnhancedSpriteWithDefaultConf();
        //     console.log(displayObject)
        //     this.edgeContainer.addChild(displayObject);
        //     this.edges.set(edgeObj.id, displayObject);
        // }

        if (width !== window.innerWidth || height !== window.innerHeight) {
            this.resize();
        }

        this.animate();
    }

    getNodeDisplayObjectById(nodeId) {
        return this.nodes.get(nodeId);
    }

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

GraphView.defaultConf = {

};