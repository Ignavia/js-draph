import style        from "./styles/style.js";
import panBehavior  from "./behaviors/panBehavior.js";
import zoomBehavior from "./behaviors/zoomBehavior.js";
import registry     from "../registry.js";
import * as utils   from "../utils.js";

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
        function: style,

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
        function: zoomBehavior,

        /**
         * The parameters to pass to the function. The function also gets the
         * stage and the renderer as their last parameters.
         *
         * @type {Array}
         */
        params: []
    }, {
        function: panBehavior,
        params: []
    }]
};

export default function makeEnhancedView(conf = {})  {
    conf = utils.adjustConf(defaultConf, conf);

    const result = conf.style.function(...conf.style.params);
    for (let behavior of conf.behaviors) {
        behavior.function(result.stage, result.renderer, ...behavior.params);
    }
    return result;
}
