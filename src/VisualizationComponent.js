import $ from  "jquery";
import mousewheel from "jquery-mousewheel";
mousewheel($);

import {NodeVisualizer} from "./draph.js";
import {GraphVisualizer} from "./draph.js";
import {EdgeVisualizer} from "./draph.js";

import PIXI from "pixi.js";

export default class GraphView {
    constructor(graphObj, width = screen.width, height = screen.height) {
        const gVisualizer = new GraphVisualizer();

        this.renderer = new PIXI.autoDetectRenderer(width, height, {
            autoResize:      true,
            resolution:      window.devicePixelRatio || 1,
            backgroundColor: gVisualizer.style.backgroundColor.hex
        });

        this.canvasRenderer = new PIXI.CanvasRenderer({
            antialias:  true,
            resolution: window.devicePixelRatio || 1
        });

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
        this.stage         = new PIXI.Container();
        this.nodeContainer = new PIXI.Container();
        this.edgeContainer = new PIXI.Container();
        this.stage.addChild(this.edgeContainer);
        this.stage.addChild(this.nodeContainer);

        // Apply drop shadows to all node graphics
        const dropShadow = new PIXI.filters.DropShadowFilter();
        dropShadow.color = gVisualizer.style.dropShadow.color.hex;
        dropShadow.alpha = gVisualizer.style.dropShadow.color.alpha;
        dropShadow.angle = gVisualizer.style.dropShadow.angle;
        dropShadow.blurX = gVisualizer.style.dropShadow.blur.x;
        dropShadow.blurY = gVisualizer.style.dropShadow.blur.y;
        dropShadow.distance = gVisualizer.style.dropShadow.distance;
        this.nodeContainer.filters = [dropShadow];

        for (let nodeObj of graphObj.iterNodes()) {
            const nVisualizer = new NodeVisualizer();
            const displayObject = nVisualizer.makeDisplayObject(nodeObj, this);
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
              factor = Math.pow(this.graph.visualizer.behavior.zoomFactor, sign);

        if (this.stage.scale.x * factor < this.graph.visualizer.behavior.minScaleX * 0.99 ||
            this.stage.scale.y * factor < this.graph.visualizer.behavior.minScaleY * 0.99 ||
            this.stage.scale.x * factor > this.graph.visualizer.behavior.maxScaleX * 1.01 ||
            this.stage.scale.y * factor > this.graph.visualizer.behavior.maxScaleY * 1.01) {

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