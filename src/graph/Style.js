import _ from "lodash";

import {Vec2}             from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

export default class Style {
    constructor(conf) {
        _.merge(this, Style.default, conf);
    }
}

Style.default = {
    backgroundColor: predefinedColors.white,
    dropShadow: {
        angle:    Math.PI / 4,
        blur:     new Vec2(4, 4),
        color:    predefinedColors.gray,
        distance: 5
    }
};
