import {predefinedColors} from "@ignavia/util";
import Style              from "./Style.js";

export default class LabelledStyle extends Style {
    constructor() {
        super();

        this.backgroundColor = predefinedColors.white;

        this.border = {
            color:  predefinedColors.black,
            radius: 5,
            width:  2
        };

        this.padding = 10;

        this.margin = 2;

        /**
         * The shape of this node. The values "circle", "ellipse", "rect",
         * "roundedRect" are supported. The default value is "ellipse".
         *
         * @type {String}
         */
        this.shape = "ellipse";

        this.text = {
            align:           "left",
            dropShadow:      {
                                 angle:    Math.PI / 4,
                                 color:    predefinedColors.gray,
                                 distance: 0
                             },
            fill:            predefinedColors.black,
            font:            {
                                 family: "Arial",
                                 size:   12,
                                 style:  "normal",
                                 weight: "bold"
                             },
            stroke:          predefinedColors.white,
            strokeThickness: 0,
            textBaseline:    "center",
            wordWrapWidth:   0
        };
    }

    makeDisplayObject(nodeObj, graphicalComponent) {

        // Bundles label, box and margin
        const container = new PIXI.Container();

        // Make label
        const label = new PIXI.Text(nodeObj.rdf.nominalValue, {
            align:              this.text.align,
            dropShadow:         this.text.dropShadow.distance > 0,
            dropShadowAngle:    this.text.dropShadow.angle,
            dropShadowColor:    this.text.dropShadow.color.hex,
            dropShadowDistance: this.text.dropShadow.distance,
            fill:               this.text.fill.hex,
            font:               `${this.text.font.weight} ${this.text.font.style} ${this.text.font.size}px ${this.text.font.family}`,
            stroke:             this.text.stroke.hex,
            strokeThickness:    this.text.strokeThickness,
            wordWrap:           this.text.wordWrapWidth > 0,
            wordWrapWidth:      this.text.wordWrapWidth
        });
        label.x = -label.width  / 2;
        label.y = -label.height / 2;

        // Make box
        const box = new PIXI.Graphics();
        box.lineStyle(this.border.width, this.border.color.hex, this.border.color.alpha);
        box.beginFill(this.backgroundColor.hex, this.backgroundColor.alpha);

        if (this.shape === "circle") {
            box.drawCircle(
                0,
                0,
                Math.max(label.width, label.height) / 2 + this.padding
            );
        } else if (this.shape === "ellipse") {
            box.drawEllipse(
                0,
                0,
                label.width  / Math.sqrt(2) + this.padding,
                label.height / Math.sqrt(2) + this.padding
            );
        } else if (this.shape === "rect") {
            box.drawRect(
                -label.width  / 2 -     this.padding,
                -label.height / 2 -     this.padding,
                 label.width      + 2 * this.padding,
                 label.height     + 2 * this.padding
            );
        } else if (this.shape === "roundedRect") {
            box.drawRoundedRect(
                -label.width  / 2 -     this.padding,
                -label.height / 2 -     this.padding,
                 label.width      + 2 * this.padding,
                 label.height     + 2 * this.padding,
                this.border.radius
            );
        }

        // Make margin
        const margin = new PIXI.Graphics();
        margin.beginFill(predefinedColors.transparent.hex, predefinedColors.transparent.alpha);
        margin.drawRect(
            -box.width  / 2 -     this.margin,
            -box.height / 2 -     this.margin,
             box.width      + 2 * this.margin,
             box.height     + 2 * this.margin
        );

        container.addChild(margin);
        container.addChild(box);
        container.addChild(label);

        // Using Canvas renderer for smoother lines
        const texture = container.generateTexture(graphicalComponent.canvasRenderer),
              sprite  = new PIXI.Sprite(texture);

        if (this.width !== "auto") {
            sprite.width = this.width;
        }
        if (this.height !== "auto") {
            sprite.height = this.height;
        }

        sprite.visible = this.visibility;

        // Placing the texture at the origin of the coordinate system of the sprite
        sprite.anchor = {
            x: 0.5,
            y: 0.5
        };

        return sprite;
    }
}
