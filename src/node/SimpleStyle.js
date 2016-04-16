import {predefinedColors} from "@ignavia/util";
import Style              from "./Style.js";

export default class SimpleStyle extends Style {
    constructor() {
        super();

        this.backgroundColor = predefinedColors.white;

        this.border = {
            color: predefinedColors.black,
            width: 2
        };

        this.radius = 10;
    }

    makeDisplayObject(nodeObj, graphicalComponent) {
        const g = new PIXI.Graphics();
        g.lineStyle(this.border.width, this.border.color.hex, this.border.color.alpha);
        g.beginFill(this.backgroundColor.hex, this.backgroundColor.alpha);
        g.drawCircle(
            this.radius / 2,
            this.radius / 2,
            this.radius
        );

        // Using Canvas renderer for smoother lines
        const texture = g.generateTexture(graphicalComponent.canvasRenderer),
              sprite  = new PIXI.Sprite(texture);

        if (this.width !== "auto") {
            sprite.width = this.width;
        }
        if (this.height !== "auto") {
            sprite.height = this.height;
        }

        sprite.visible = this.visibility;

        return sprite;
    }
}
