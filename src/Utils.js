import _ from "lodash";

export const canvasRenderer = new PIXI.CanvasRenderer({
    antialias:  true,
    resolution: window.devicePixelRatio || 1
});

const renderer = new PIXI.WebGLRenderer(screen.width, screen.height, {
            autoResize:      true,
            resolution:      window.devicePixelRatio || 1,
            backgroundColor: 0xFFFFFF
        });

export const emptyDisplayObject = new PIXI.DisplayObject();

export function makeCanvasSprite(displayObject, {width = "auto", height = "auto"} = {}) {
    const texture = displayObject.generateTexture(canvasRenderer);
    const sprite  = new PIXI.Sprite(texture);

    if (width !== "auto") {
        sprite.width = width;
    }
    if (height !== "auto") {
        sprite.height = height;
    }

    return sprite;
}

export function adjustConf(base, adjustments) {
    return _.merge({}, base, adjustments);
}