import registry   from "../registry.js";
import * as utils from "../utils.js";

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
         * @type {String}
         */
        type: "default",

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
         * @type {String}
         */
        type: "zoom",

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {}
    }, {

        /**
         * The function to call to add the behavior.
         *
         * @type {String}
         */
        type: "pan",

        /**
         * The configuration to pass to the function.
         *
         * @type {Object}
         */
        conf: {}
    }]
};

export default function makeEnhancedView(conf = {})  {
    conf = utils.adjustConf(defaultConf, conf);

    const style  = registry.get(["graph", "style", conf.style.type]);
    const result = style(conf.style.conf);
    for (let behavior of conf.behaviors) {
        const behaviorFunction = registry.get(["graph", "behavior", behavior.type]);
        behaviorFunction(result.stage, result.renderer, behavior.conf);
    }

    return result;
}
