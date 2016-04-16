import $ from "jquery";
import VisualizationComponent from "./src/VisualizationComponent.js";

import 'systemjs-hot-reloader/default-listener.js';

import * as earl from "@ignavia/earl";

const g = new earl.Graph();
const n0 = new earl.Node();
const n1 = new earl.Node();
const n2 = new earl.Node();
const n3 = new earl.Node();
const n4 = new earl.Node();
g.addNodes(n0, n1, n2, n3, n4);

const view = new VisualizationComponent(g);

console.log(g);

for (let node of g.iterNodes()) {
    console.log(node)
}

$(window).on("resize", () => {
    view.resize();
});