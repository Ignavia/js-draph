import _ from "lodash";

export default class Behavior {
    constructor(conf = {}) {
        _.merge(this, Behavior.default, conf);
    }
}

Behavior.default = {
    handleMouseover:  () => { console.log("Mouseover"); },
    handleMouseout:   () => { console.log("Mouseout"); },
    handleMousedown:  () => { console.log("Mousedown"); },
    handleMouseup:    () => { console.log("Mouseup"); },
    handleClick:      () => { console.log("Click"); },
    handleTouchstart: () => { console.log("Touchstart"); },
    handleTouchend:   () => { console.log("Touchend"); },
    handleTap:        () => { console.log("Tap"); },
};
