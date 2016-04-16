import LineStyle from "./LineStyle.js";

export default class StraightStyle extends LineStyle {
    constructor() {
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
        line.lineTo(targetDisplayObject.x - centerX, targetDisplayObject.y - centerY);

        const texture = line.generateTexture(graphicalComponent.canvasRenderer),
              sprite  = new PIXI.Sprite(texture);

        // Placing the sprite between the two nodes
        sprite.x = centerX;
        sprite.y = centerY;
        sprite.anchor = {
            x: 0.5,
            y: 0.5
        };

        return sprite;

        // TODO arrow, node styles should offer collision detection or have a method that returns their shape/bounds
    }
}
