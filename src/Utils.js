export const canvasRenderer = new PIXI.CanvasRenderer({
    antialias:  true,
    resolution: window.devicePixelRatio || 1
});

const renderer = new PIXI.CanvasRenderer(screen.width, screen.height, {
            autoResize:      true,
            resolution:      window.devicePixelRatio || 1
        });

console.log(window.devicePixelRatio)

export function makeCanvasSprite(displayObject, {width = "auto", height = "auto"} = {}) {
    const texture = displayObject.generateTexture(renderer);
    const sprite  = new PIXI.Sprite(texture);

    if (width !== "auto") {
        sprite.width = width;
    }
    if (height !== "auto") {
        sprite.height = height;
    }

    return sprite;
}