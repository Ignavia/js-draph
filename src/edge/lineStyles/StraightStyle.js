import _ from "lodash";

import {predefinedColors} from "@ignavia/util";
import {Vec2}             from "@ignavia/ella";

export default class StraightStyle {
    constructor(conf) {
        _.merge(this, StraightStyle.default, conf);
    }

    makeDisplayObject(edgeObj, graphicalComponent, conf = StraightStyle.default) {
        const sourceDisplayObject = graphicalComponent.getNodeDisplayObjectById(edgeObj.sourceId),
              targetDisplayObject = graphicalComponent.getNodeDisplayObjectById(edgeObj.targetId),
              centerX             = (sourceDisplayObject.x + targetDisplayObject.x) / 2,
              centerY             = (sourceDisplayObject.y + targetDisplayObject.y) / 2;

        const line = new PIXI.Graphics();
        line.lineStyle(conf.width, conf.color.hex, conf.color.alpha);
        line.moveTo(sourceDisplayObject.x - centerX, sourceDisplayObject.y - centerY);
        line.lineTo(targetDisplayObject.x - centerX, targetDisplayObject.y - centerY);

        const texture = line.generateTexture(graphicalComponent.canvasRenderer);
        const sprite  = new PIXI.Sprite(texture);

        // Placing the sprite between the two nodes
        sprite.x = centerX;
        sprite.y = centerY;
        sprite.anchor = {
            x: 0.5,
            y: 0.5
        };

        if (conf.decalAnchor === "auto") {
            sprite.decalAnchor = new Vec2(centerX, centerY);
        } else {
            sprite.decalAnchor = conf.decalAnchor;
        }

        return sprite;
    }
}

StraightStyle.default = {
    color: predefinedColors.black,
    width: 2,
    decalAnchor: "auto"
};
