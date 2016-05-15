import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

export default class QuadraticCurveStyle {
    constructor() {
        _.merge(this, LabelledStyle.default, conf);
    }

    makeDisplayObject(edgeObj, graphicalComponent, conf = QuadraticCurveStyle.default) {
        const sourceDisplayObject = graphicalComponent.getNodeDisplayObjectById(edgeObj.sourceId),
              targetDisplayObject = graphicalComponent.getNodeDisplayObjectById(edgeObj.targetId),
              centerX             = (sourceDisplayObject.x + targetDisplayObject.x) / 2,
              centerY             = (sourceDisplayObject.y + targetDisplayObject.y) / 2;

        const line = new PIXI.Graphics();
        line.lineStyle(conf.line.width, conf.line.color.hex, conf.line.color.alpha);
        line.moveTo(sourceDisplayObject.x - centerX, sourceDisplayObject.y - centerY);
        line.quadraticCurveTo(
            centerX,
            centerY,
            targetDisplayObject.x - centerX,
            targetDisplayObject.y - centerY
        );

        const texture = line.generateTexture(graphicalComponent.canvasRenderer),
              sprite  = new PIXI.Sprite(texture);

        // Placing the sprite between the two nodes
        sprite.x = centerX;
        sprite.y = centerY;
        sprite.anchor = {
            x: 0.5, // Problem: 0.5, 0.5 is no longer the correct value
                    // I want the anchor to be the place where the decal should be, which is the control point most likely
            y: 0.5
        };

        return sprite;
    }
}

QuadraticCurveStyle.default = {
    parallel:      0.5,
    perpendicular: 20,
    color: predefinedColors.black,
    width: 2,
    decalAnchor: "auto"
};
