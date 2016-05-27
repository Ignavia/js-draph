import * as style        from "./styles/style.js";
import * as panBehavior  from "./behaviors/panBehavior.js"
import * as zoomBehavior from "./behaviors/zoomBehavior.js";
import registry          from "../registry.js";

/**
 * The default configuration of this visualizer.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The style to use to create the stage and renderer.
     *
     * @type {Object}
     */
    style: {

        /**
         * The function to call to make the stage and renderer.
         *
         * @type {Function}
         */
        function: style.makeViewWithDefaultConf,

        /**
         * The parameters to pass to that function.
         *
         * @type {Array}
         */
        params: []
    },

    /**
     * The behaviors to add to the stage.
     *
     * @type {Array<Object>}
     */
    behaviors: [{

        /**
         * The function to call to add the behavior.
         *
         * @type {Function}
         */
        function: zoomBehavior.addBehaviorWithDefaultConf,

        /**
         * The parameters to pass to the function. The function also gets the
         * stage and the renderer as their last parameters.
         *
         * @type {Array}
         */
        params: []
    }, {
        function: panBehavior.addBehavior,
        params: []
    }]
};

export function makeEnhancedView(conf)  {
    const result = conf.style.function(...conf.style.params);

    for (let behavior of conf.behaviors) {
        behavior.function(...behavior.params, result.stage, result.renderer);
    }

    return result;
}

export function makeEnhancedViewWithDefaultConf() {
    return makeEnhancedView(defaultConf);
}