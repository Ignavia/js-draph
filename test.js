import $ from "jquery";
import GraphView from "./src/GraphView.js";

import 'systemjs-hot-reloader/default-listener.js';

import * as earl from "@ignavia/earl";

const g = new earl.Graph();
// const n0 = new earl.Node();
// const n1 = new earl.Node();
// const n2 = new earl.Node();
// g.addNodes(n0, n1, n2);

const e0 = new earl.Edge("n0", "n1");
const e1 = new earl.Edge("n1", "n2");
const e2 = new earl.Edge("n2", "n3");
const e3 = new earl.Edge("n3", "n0");
const e4 = new earl.Edge("n2", "n0");
const e5 = new earl.Edge("n3", "n1");
g.addEdges(e0, e1, e2, e3, e4, e5);

const view = new GraphView("container", g);

$(window).on("resize", () => {
    view.resize();
});