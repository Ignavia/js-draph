export GraphView  from "./GraphView.js";
export *          from "./graph/graph.js";
export *          from "./node/node.js";
export *          from "./edge/edge.js";
export registry   from "./registry.js";
export * as utils from "./utils.js";

import registry from "./registry.js";
console.log([...registry.paths()].map(path => path.toString()))