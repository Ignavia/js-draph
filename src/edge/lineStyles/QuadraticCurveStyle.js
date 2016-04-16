import LineStyle from "./LineStyle.js";

export default class QuadraticCurveStyle extends LineStyle {
    constructor() {

        this.parallel = 0.5;

        this.perpendicular = 20; // could be automatically adjusted if we go through all edges that start at a node and pass in a counter; always postive, so nodes ending here are bend the other way

        super();
    }

    makeDisplayObject(edgeObj, graphicalComponent) {
        const sourceDisplayObject = graphicalComponent.getNodeDisplayObjectById(edgeObj.sourceId),
              targetDisplayObject = graphicalComponent.getNodeDisplayObjectById(edgeObj.targetId),
              centerX             = (sourceDisplayObject.x + targetDisplayObject.x) / 2,
              centerY             = (sourceDisplayObject.y + targetDisplayObject.y) / 2;

        const line = new PIXI.Graphics();
        line.lineStyle(this.line.width, this.line.color.hex, this.line.color.alpha);
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
