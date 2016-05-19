import PIXI from "pixi.js";

import $          from "jquery";
import mousewheel from "jquery-mousewheel";
mousewheel($);

import {GraphStyle} from "./draph.js";
import {NodeVisualizer}  from "./draph.js";
import {EdgeVisualizer}  from "./draph.js";

export default class GraphView {
    constructor(graphObj, width = screen.width, height = screen.height) {
        this.gVisualizer = new GraphVisualizer();

        $("#container").html(this.renderer.view);

        $(this.renderer.view).mousewheel((e) => {
            if (e.deltaY !== 0) {
                this.zoom(e.deltaY < 0 ? "out" : "in");
            }
        }).mousedown((e) => {
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

        // Set up containers


        // Apply drop shadows to all node graphics


        for (let nodeObj of graphObj.iterNodes()) {
            const displayObject = LabelledStyle.makeSpriteWithDefaultConf("Placeholder");
            this.nodeContainer.addChild(displayObject);
            this.nodes.set(nodeObj.id, displayObject);
        }
        for (let edgeObj of graphObj.iterEdges()) {
            const eVisualizer = new EdgeVisualizer();
            const displayObject = eVisualizer.makeDisplayObject(edgeObj, this);
            this.edgeContainer.addChild(displayObject);
            this.edges.set(edgeObj.id, displayObject);
        }

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

    zoom(direction = "in") {
        const sign   = direction === "in" ? 1 : -1,
              factor = Math.pow(this.gVisualizer.behavior.zoomFactor, sign);

        if (this.stage.scale.x * factor < this.gVisualizer.behavior.minScaleX * 0.99 ||
            this.stage.scale.y * factor < this.gVisualizer.behavior.minScaleY * 0.99 ||
            this.stage.scale.x * factor > this.gVisualizer.behavior.maxScaleX * 1.01 ||
            this.stage.scale.y * factor > this.gVisualizer.behavior.maxScaleY * 1.01) {

            return;
        }

        const beforeTransform = this.renderer.plugins.interaction.mouse.getLocalPosition(this.stage);

        this.stage.scale.x *= factor;
        this.stage.scale.y *= factor;

        const afterTransform = {
            x: beforeTransform.x / factor,
            y: beforeTransform.y / factor
        };

        this.stage.position.x += (afterTransform.x - beforeTransform.x) * this.stage.scale.x;
        this.stage.position.y += (afterTransform.y - beforeTransform.y) * this.stage.scale.y;
    }

    addNode(visualizer) {

    }

    addEdge() {

    }
}