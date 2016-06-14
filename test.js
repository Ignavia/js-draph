import $ from "jquery";
import GraphView from "./src/GraphView.js";

import {predefinedColors} from "@ignavia/util";

import 'systemjs-hot-reloader/default-listener.js';

import * as earl from "@ignavia/earl";

const g = new earl.Graph();
const n0 = new earl.Node("n0");
const n1 = new earl.Node("n1");
const n2 = new earl.Node("n2");
g.addNodes(n0, n1, n2);

const e0 = new earl.Edge("n0", "n1");
const e1 = new earl.Edge("n1", "n2");
const e2 = new earl.Edge("n2", "n3");
const e3 = new earl.Edge("n3", "n0");
const e4 = new earl.Edge("n2", "n0");
const e5 = new earl.Edge("n3", "n1");
g.addEdges(e0, e1, e2, e3, e4, e5);

const view = new GraphView(g, {
    graphConf: {
        style: {
            conf: {
                backgroundColor: predefinedColors.blue
            },
        },
    }
});
$("#container").html(view.renderer.view);

$(window).on("resize", () => {
    view.resize();
});