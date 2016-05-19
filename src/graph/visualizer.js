import * as style        from "./styles/style.js";
import * as zoomBehavior from "./behaviors/zoomBehavior.js";

/**
 * The default configuration of this visualizer.
 *
 * @type {Object}
 */
export const defaultConf = {
    style: {
        function: style.makeViewWithDefaultConf,
        params: []
    },
    behaviors: [{
        function: zoomBehavior.addBehavior,
        params: []
    }]
};

export function makeEnhancedView(conf)  {
    const result = conf.style.function(...conf.style.params);

    for (let behavior of conf.behaviors) {
        behavior.function(...behavior.params, result);
    }
}

export function makeEnhancedViewWithDefaultConf() {
    return makeEnhancedView(defaultConf);
}