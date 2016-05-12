import $ from "jquery";
import GraphView from "./src/GraphView.js";

import 'systemjs-hot-reloader/default-listener.js';

import * as earl from "@ignavia/earl";

const g = new earl.Graph();
const n0 = new earl.Node();
const n1 = new earl.Node();
const n2 = new earl.Node();
g.addNodes(n0, n1, n2);

const e0 = new earl.Edge(n0, n1);
const e1 = new earl.Edge(n1, n2);
g.addEdges(e0, e1);

const view = new GraphView(g);

$(window).on("resize", () => {
    view.resize();
});