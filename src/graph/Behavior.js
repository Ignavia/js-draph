import _ from "lodash";

export default class Behavior {
    constructor(conf = {}) {
        _.merge(this, Behavior.default, conf);
    }
}

//mousewheel, mouseup, mousedown,

Behavior.default = {
    zoomFactor: 1.1,
    maxScaleX: 1,
    minScaleX: 0.1,
    maxScaleY: 1,
    minScaleY: 0.1
};
