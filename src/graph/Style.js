import {Vec2}             from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

export default class Style {
    constructor() {
        this.backgroundColor = predefinedColors.white;

        this.dropShadow = {
            angle:    Math.PI / 4,
            blur:     new Vec2(4, 4),
            color:    predefinedColors.gray,
            distance: 5
        };
    }
}
