import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

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

/**
 * Creates a display object of a circle.
 *
 * @param {Number} radius
 * The radius of the circle.
 *
 * @param {Object} style
 * How the circle should look.
 *
 * @param {Object} style.border
 * How the border around the circle should look.
 *
 * @param {Number} style.border.width
 * The line width of the border.
 *
 * @param {Color} style.border.color
 * The color of the border.
 *
 * @param {Color} style.backgroundColor
 * The color to fill the circle with.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export function makeCircle(radius, style) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.border.width, style.border.color.hex, style.border.color.alpha);
    result.beginFill(style.backgroundColor.hex, style.backgroundColor.alpha);
    result.drawCircle(
        0,
        0,
        radius
    );
    return result;
}

export function makeEllipse(width, height, style) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.border.width, style.border.color.hex, style.border.color.alpha);
    result.beginFill(style.backgroundColor.hex, style.backgroundColor.alpha);
    result.drawEllipse(
        0,
        0,
        width,
        height
    );
    return result;
}

export function makeRect(width, height, style) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.border.width, style.border.color.hex, style.border.color.alpha);
    result.beginFill(style.backgroundColor.hex, style.backgroundColor.alpha);
    result.drawRect(
        -width  / 2,
        -height / 2,
        width,
        height
    );
    return result;
}

export function makeRoundedRect(width, height, radius, style) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.border.width, style.border.color.hex, style.border.color.alpha);
    result.beginFill(style.backgroundColor.hex, style.backgroundColor.alpha);
    result.drawRoundedRect(
        -width  / 2,
        -height / 2,
        width,
        height,
        radius
    );
    return result;
}

/**
 * Creates a display object of a label.
 *
 * @param {String} content
 * The string to use as label.
 *
 * @param {Object} style
 * How the label should look.
 *
 * @param {String} style.align
 * How the next should be aligned. The possible values are "left", "center" and
 * "right". For a single line of text this option has no effect.
 *
 * @param {Object} style.dropShadow
 * How the drop shadow of the text should look.
 *
 * @param {Number} style.dropShadow.distance
 * How long the drop shadow should be. Set this to 0 to remove it.
 *
 * @param {Number} style.dropShadow.angle
 * The angle of the drop shadow given in radian. An angle of 0 means that the
 * shadow goes to the right, increasing the angle moves the shadow clockwise.
 *
 * @param {Color} style.dropShadow.color
 * The color of the shadow.
 *
 * @param {Color} style.fillColor
 * The color to fill the text with.
 *
 * @param {Object} style.font
 * COnfigures the font of the text.
 *
 * @param {String} style.font.family
 * The font-family to use.
 *
 * @param {String} style.font.size
 * The font-size to use.
 *
 * @param {String} style.font.weight
 * The weight of the font. This can either be "normal" or "bold".
 *
 * @param {String} style.font.style
 * The style of the font. This can either be "normal", "italic" or "oblique".
 *
 * @param {Object} style.stroke
 * How the stroke around the text should look.
 *
 * @param {Color} style.stroke.color
 * The color of the stroke around the text.
 *
 * @param {Number} style.stroke.thickness
 * How thick the stroke should be.
 *
 * @param {Number} style.wordWrapWidth
 * The width at which the text is going to wrap. Set this to 0 to disable it.
 */
export function makeText(content, style) {
    const result = new PIXI.Text(content, {
        align:              style.align,
        dropShadow:         style.dropShadow.distance > 0,
        dropShadowAngle:    style.dropShadow.angle,
        dropShadowColor:    style.dropShadow.color.hex,
        dropShadowDistance: style.dropShadow.distance,
        fill:               style.fillColor.hex,
        font:               `${style.font.weight} ${style.font.style} ${style.font.size}px ${style.font.family}`,
        stroke:             style.stroke.color.hex,
        strokeThickness:    style.stroke.thickness,
        wordWrap:           style.wordWrapWidth > 0,
        wordWrapWidth:      style.wordWrapWidth
    });
    result.x = -result.width  / 2;
    result.y = -result.height / 2;
    return result;
}

export function makeMargin(contentWidth, contentHeight, margin) {
    const result = new PIXI.Graphics();
    result.beginFill(predefinedColors.transparent.hex, predefinedColors.transparent.alpha);
    result.drawRect(
        -contentWidth  / 2 -     margin,
        -contentHeight / 2 -     margin,
         contentWidth      + 2 * margin,
         contentHeight     + 2 * margin
    );
    return result;
}
