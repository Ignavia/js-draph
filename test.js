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

const e0 = new earl.Edge("n0", "n1", "e0");
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
                backgroundColor: predefinedColors.gray,
            },
        },
    },
    nodeConfs: new Map([[
        "n0", {
            style: {
                type: "labelled",
                conf: {
                    text: {
                        label: "RDF",
                        fillColor: predefinedColors.maroon,
                        stroke: {
                            color: predefinedColors.black,
                            thickness: 1
                        },
                    },
                    box: {
                        backgroundColor: predefinedColors.pink,
                        shape: "roundedRect",
                        border: {
                            radius: 10
                        }
                    }
                }
            }
        }
    ]]),
    edgeConfs: new Map([[
        "e0", {
            arrowStyle: {
                conf: {
                    backgroundColor: predefinedColors.green,
                    border: {
                        width: 2,
                    },
                    measures: {
                        tipAngle: Math.PI / 4,
                        baseLength: 20,
                    }
                },
            },
            lineStyle: {
                type: "quadratic",
                conf: {
                    line: {
                        color: predefinedColors.blue,
                        width: 5,
                    },
                    controlPoint: {
                        parallel: 0.5,
                        perpendicular: -200,
                    },
                },
            },
            decalStyle: {
                type: "labelled",
                conf: {
                    text: {
                        label: "RDF",
                        fillColor: predefinedColors.blue,
                        stroke: {
                            color: predefinedColors.black,
                            thickness: 1
                        },
                    },
                    box: {
                        backgroundColor: predefinedColors.orange,
                        shape: "roundedRect",
                        border: {
                            radius: 10
                        }
                    },
                    rotateToLine: true,
                }
            }
        }
    ]])
});
$("#container").html(view.renderer.view);

$(window).on("resize", () => {
    view.resize();
});