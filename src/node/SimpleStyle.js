import {predefinedColors} from "@ignavia/util";

export const defaultConf = {
    backgroundColor: predefinedColors.white,
    border: {
        color: predefinedColors.black,
        width: 2
    },
    radius: 10
};

export function makeDisplayObject(nodeObj, graphicalComponent, conf = defaultConf) {
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
