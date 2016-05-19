import _ from "lodash";

//mousewheel, mouseup, mousedown,

export const defaultConf = {
    zoomFactor: 1.1,
    maxScaleX: 1,
    minScaleX: 0.1,
    maxScaleY: 1,
    minScaleY: 0.1
};

export const addBehavior = _.curry(function (conf, stage, renderer) {
    // function in utils to add listeners
});

export const addBehaviorWithDefaultConf = addBehavior(defaultConf);
