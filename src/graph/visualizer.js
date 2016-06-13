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
         * @type {Function|GumpPath}
         */
        function: style,

        /**
         * The configuration to pass to that function.
         *
         * @type {Object}
         */
        conf: {}
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
         * @type {Function|GumpPath}
         */
        function: zoomBehavior,

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {}
    }, {
        function: panBehavior,
        conf: {}
    }]
};

export default function makeEnhancedView(conf = {})  {
    conf = utils.adjustConf(defaultConf, conf);

    const style  = registry.toFunction(conf.style.function);
    const result = style(conf.style.conf);
    for (let behavior of conf.behaviors) {
        const behaviorFunction = registry.toFunction(behavior.function);
        behaviorFunction(result.stage, result.renderer, behavior.conf);
    }

    return result;
}
