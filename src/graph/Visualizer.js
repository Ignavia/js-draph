import _ from "lodash";

import Style    from "./Style.js";
import Behavior from "./Behavior.js";

export default class Visualizer {
    constructor(conf) {
        _.merge(this, Visualizer.default, conf);
    }
}

Visualizer.default = {
    style:    new Style(),
    behavior: new Behavior()
};
