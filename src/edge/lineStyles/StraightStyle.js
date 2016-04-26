import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

export default class StraightStyle {
    constructor(conf) {
        _.merge(this, StraightStyle.default, conf);
    }

    makeDisplayObject(edgeObj, graphicalComponent) {
        const sourceDisplayObject = graphicalComponent.getNodeDisplayObjectById(edgeObj.sourceId),
              targetDisplayObject = graphicalComponent.getNodeDisplayObjectById(edgeObj.targetId),
              centerX             = (sourceDisplayObject.x + targetDisplayObject.x) / 2,
              centerY             = (sourceDisplayObject.y + targetDisplayObject.y) / 2;

        const line = new PIXI.Graphics();
        line.lineStyle(this.width, this.color.hex, this.color.alpha);
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

        return sprite;
    }
}

StraightStyle.default = {
    color: predefinedColors.black,
    width: 2
};
