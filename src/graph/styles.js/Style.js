import _ from "lodash";

import {Vec2}             from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

/**
 * The default configuration of this style.
 */
export const defaultConf = {

    /**
     * The background color of the stage.
     *
     * @type {Color}
     */
    backgroundColor: predefinedColors.white,

    /**
     * The drop shadow to apply. Set to distance to 0 to disable it.
     *
     * @type {Object}
     */
    dropShadow: {

        /**
         * The angle of the drop shadow in radians.
         *
         * @type {Number}
         */
        angle: Math.PI / 4,

        /**
         * The blur to apply to the drop shadow.
         *
         * @type {Vec2}
         */
        blur: new Vec2(4, 4),

        /**
         * The color of the drop shadow.
         *
         * @type {Color}
         */
        color: predefinedColors.gray,

        /**
         * How long the drop shadow is.
         *
         * @type {Number}
         */
        distance: 5
    }
};

// TODO: function to make renderer and stage and maybe node and edge containers