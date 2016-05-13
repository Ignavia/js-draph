import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

export default class SimpleStyle {
    constructor(conf = {}) {
        _.merge(this, SimpleStyle.default, conf);
    }

    makeDisplayObject(nodeObj, graphicalComponent, conf = SimpleStyle.default) {
        const g = new PIXI.Graphics();
        g.lineStyle(conf.border.width, conf.border.color.hex, conf.border.color.alpha);
        g.beginFill(conf.backgroundColor.hex, conf.backgroundColor.alpha);
        g.drawCircle(
            conf.radius / 2,
            conf.radius / 2,
            conf.radius
        );

        // Using Canvas renderer for smoother lines
        const texture = g.generateTexture(graphicalComponent.canvasRenderer),
              sprite  = new PIXI.Sprite(texture);

        if (conf.width !== "auto") {
            sprite.width = conf.width;
        }
        if (conf.height !== "auto") {
            sprite.height = conf.height;
        }

        sprite.visible = conf.visibility;

        return sprite;
    }
}

SimpleStyle.default = {
    backgroundColor: predefinedColors.white,
    border: {
        color: predefinedColors.black,
        width: 2
    },
    radius: 10
};
