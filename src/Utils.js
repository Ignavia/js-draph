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

export function makeWebGLSprite() {
    // TODO
}

export function adjustConf(base, adjustments) {
    return _.merge({}, base, adjustments);
}

/**
 * Creates a display object of a circle. This function is curried.
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
 * @param {Number} radius
 * The radius of the circle.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export const makeCircle = _.curry(function (style, radius) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.border.width, style.border.color.hex, style.border.color.alpha);
    result.beginFill(style.backgroundColor.hex, style.backgroundColor.alpha);
    result.drawCircle(
        0,
        0,
        radius
    );
    return result;
});

/**
 * Creates a display object of an ellipse. This function is curried.
 *
 * @param {Object} style
 * How the ellipse should look.
 *
 * @param {Object} style.border
 * How the border around the ellipse should look.
 *
 * @param {Number} style.border.width
 * The line width of the border.
 *
 * @param {Color} style.border.color
 * The color of the border.
 *
 * @param {Color} style.backgroundColor
 * The color to fill the ellipse with.
 *
 * @param {Number} halfWidth
 * The half width of the ellipse.
 *
 * @param {Number} halfHeight
 * The half height of the ellipse.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export const makeEllipse = _.curry(function (style, halfWidth, halfHeight) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.border.width, style.border.color.hex, style.border.color.alpha);
    result.beginFill(style.backgroundColor.hex, style.backgroundColor.alpha);
    result.drawEllipse(
        0,
        0,
        halfWidth,
        halfHeight
    );
    return result;
});

/**
 * Creates a display object of a rectangle. This function is curried.
 *
 * @param {Object} style
 * How the rectangle should look.
 *
 * @param {Object} style.border
 * How the border around the rectangle should look.
 *
 * @param {Number} style.border.width
 * The line width of the border.
 *
 * @param {Color} style.border.color
 * The color of the border.
 *
 * @param {Color} style.backgroundColor
 * The color to fill the rectangle with.
 *
 * @param {Number} width
 * The width of the rectangle.
 *
 * @param {Number} height
 * The height of the rectangle.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export const makeRect = _.curry(function (style, width, height) {
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
});

/**
 * Creates a display object of a rounded rectangle. This function is curried.
 *
 * @param {Object} style
 * How the rounded rectangle should look.
 *
 * @param {Object} style.border
 * How the border around the rounded rectangle should look.
 *
 * @param {Number} style.border.width
 * The line width of the border.
 *
 * @param {Color} style.border.color
 * The color of the border.
 *
 * @param {Color} style.backgroundColor
 * The color to fill the rounded rectangle with.
 *
 * @param {Number} width
 * The width of the rounded rectangle.
 *
 * @param {Number} height
 * The height of the rounded rectangle.
 *
 * @param {Number} radius
 * The radius of the circles at the corners of the rectangle.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export const makeRoundedRect = _.curry(function (style, width, height, radius) {
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
});

/**
 * Creates a display object of a text. This function is curried.
 *
 * @param {Object} style
 * How the text should look.
 *
 * @param {String} style.align
 * How the text should be aligned. The possible values are "left", "center" and
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
 * Configures the font of the text.
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
 * How thick the stroke should be. Set this to 0 to deactivate it.
 *
 * @param {Number} style.wordWrapWidth
 * The width at which the text is going to wrap. Set this to 0 to disable it.
 *
 * @param {String} s
 * The string to use as text.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
export const makeText = _.curry(function (style, s) {
    const result = new PIXI.Text(s, {
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
});

/**
 * Creates a display object of a box around the given display object.
 *
 * @param {Object} style
 * How the box should look.
 *
 * @param {String} style.shape
 * The shape of the box. This can be one of "circle", "ellipse", "rect" or
 * "roundedRect".
 *
 * @param {Number} style.padding
 * The padding to add around the given display object.
 *
 * @param {Object} style.border
 * How the border of the box should look.
 *
 * @param {Number} style.border.width
 * The line width of the border.
 *
 * @param {Color} style.border.color
 * The color of the border.
 *
 * @param {Number} style.border.radius
 * This is only relevant when the shape is set to "roundedRect". It describes
 * the radius of the circles in the corners of the rectangle.
 *
 * @param {Color} style.backgroundColor
 * The color to fill the box with.
 *
 * @param {DisplayObject} displayObject
 * The display object to make a box for.
 *
 * @return {DisplayObject}
 * The resulting box.
 */
export const makeBox = _.curry(function (style, displayObject) {
    switch (style.shape) {
    case "circle":
        return makeCircle(
            style,
            Math.max(displayObject.width, displayObject.height) / 2 + style.padding
        );
    case "ellipse":
        return makeEllipse(
            style,
            displayObject.width  / Math.sqrt(2) + style.padding,
            displayObject.height / Math.sqrt(2) + style.padding
        );
    case "rect":
        return makeRect(
            style,
            displayObject.width  + 2 * style.padding,
            displayObject.height + 2 * style.padding
        );
    case "roundedRect":
        return makeRoundedRect(
            style,
            displayObject.width  + 2 * style.padding,
            displayObject.height + 2 * style.padding,
            style.border.radius
        );
    }
});

/**
 * Creates a transparent margin for the given display object. This function is
 * curried.
 *
 * @param {Number} margin
 * How wide the margin at one side should be.
 *
 * @param {DisplayObject} displayObject
 * The display object to make a margin for.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
export const makeMargin = _.curry(function (margin, displayObject) {
    const result = new PIXI.Graphics();
    result.beginFill(predefinedColors.transparent.hex, predefinedColors.transparent.alpha);
    result.drawRect(
        -displayObject.width  / 2 -     margin,
        -displayObject.height / 2 -     margin,
         displayObject.width      + 2 * margin,
         displayObject.height     + 2 * margin
    );
    return result;
});

/**
 * Creates a diplay object from the image at the given location.
 *
 * @param {String} path
 * The location of the image.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
export function makeImage(path) {
    const result = PIXI.Sprite.fromImage(path);
    result.x = -result.width  / 2;
    result.y = -result.height / 2;
    return result;
}

/**
 * Creates a display object of a caption for the given display object. This
 * function is curried.
 *
 * @param {Object} style
 * How the caption should look.
 *
 * @param {Object} style.text
 * How the text should look. Refer to the makeText function to see how this
 * sub-object has to be structured.
 *
 * @param {Object} style.caption
 * Affects the style of the caption in general.
 *
 * @param {String} style.caption.side
 * Where the caption should be positioned in relation to the given display
 * object. Possible options are "center", "above", "right", "below" and "left".
 *
 * @param {Number} style.caption.gap
 * How large the gap between the given display object and the caption should be.
 *
 * @param {String} text
 * The text to display.
 *
 * @param {DisplayObject} displayObject
 * The display object to make the caption for.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
export const makeCaption = _.curry(function (style, text, displayObject) {
    const result = makeText(style.text, text);

    switch (style.caption.side) {
    case "above":
        result.y -= (displayObject.height + result.height) / 2 + style.caption.gap; break;
    case "right":
        result.x += (displayObject.width  + result.width)  / 2 + style.caption.gap; break;
    case "below":
        result.y += (displayObject.height + result.height) / 2 + style.caption.gap; break;
    case "left":
        result.x -= (displayObject.width  + result.width)  / 2 + style.caption.gap; break;
    }

    return result;
});

/**
 * Creates a label surrounded by a box.
 *
 * @param {Object} style
 * How everything should look.
 *
 * @param {Object} style.text
 * How the text should look. Refer to the makeText function to see how this
 * sub-object has to be structured.
 *
 * @param {Object} style.box
 * How the box around the text should look. Refer to the makeBox function to see
 * how this sub-object has to be structured.
 *
 * @param {Object} style.box.margin
 * The margin to add around the box. This is useful to prevent PIXI from cutting
 * some pixels of the border off.
 *
 * @param {String} text
 * The text to display.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
export const makeBoxedLabel = _.curry(function (style, text) {
    const result    = new PIXI.Container();
    const label     = makeText(style.text, text);
    const box       = makeBox(style.box, label);
    const margin    = makeMargin(style.box.margin, box);
    result.addChild(margin);
    result.addChild(box);
    result.addChild(label);
    return result;
});

/**
 *
 */
export const makeCaptionedImage = _.curry(function (style, imagePath, text) {
    const result       = new PIXI.Container();
    const illustration = makeImage(imagePath);

    if (style.captionSide !== "none") {
        const caption = makeCaption(style, text, illustration);
        result.addChild(caption);
    }

    result.addChild(illustration);

    return result;
});