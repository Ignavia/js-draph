import _ from "lodash";

import {Vec2}             from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

/**
 * A canvas renderer.
 *
 * @type {Renderer}
 * @ignore
 */
export const canvasRenderer = new PIXI.CanvasRenderer({
    antialias:  true,
    resolution: window.devicePixelRatio || 1
});

/**
 * A WebGL renderer.
 *
 * @type {Renderer}
 * @ignore
 */
const webGLRenderer = new PIXI.WebGLRenderer(screen.width, screen.height, {
    autoResize:      true,
    resolution:      window.devicePixelRatio || 1,
    backgroundColor: 0xFFFFFF
});

/**
 * Creates a sprite from the given display object using a canvas renderer.
 *
 * @param {DisplayObject} displayObject
 * The display object to turn into a sprite.
 */
export function makeCanvasSprite(displayObject) {
    const texture = displayObject.generateTexture(canvasRenderer);
    return new PIXI.Sprite(texture);
}

export function makeWebGLSprite() {
    // TODO
}

/**
 * An empty display object.
 *
 * @type {DisplayObject}
 */
export const emptyDisplayObject = new PIXI.DisplayObject();
emptyDisplayObject.width  = 0;
emptyDisplayObject.height = 0;

/**
 * Replaces the properties in the base configuration with the ones listed in the
 * adjustments object. Anything not listed in the adjustments object is taken
 * unaltered from the base object.
 *
 * @param {Object} base
 * The base configuration.
 *
 * @param {Object} adjustments
 * The adjustments to make.
 *
 * @return {Object}
 * The resulting configuration.
 */
export function adjustConf(base, adjustments) {
    return _.merge({}, base, adjustments);
}

/**
 * Creates a display object of line.
 *
 * @param {Object} style
 * How the line should look.
 *
 * @param {Number} style.width
 * The width of the line.
 *
 * @param {Color} style.color
 * The color of the line.
 *
 * @param {Vec2} startPos
 * Where to start the line.
 *
 * @param {Vec2} endPos
 * Where to end the line.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export const makeLine = _.curry(function (style, startPos, endPos) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.width, style.color.hex, style.color.alpha);
    result.moveTo(startPos.x, startPos.y);
    result.lineTo(endPos.x, endPos.y);
    return result;
});

/**
 * Creates a display object of quadratic curve.
 *
 * @param {Object} style
 * How the line should look.
 *
 * @param {Number} style.width
 * The width of the line.
 *
 * @param {Color} style.color
 * The color of the line.
 *
 * @param {Vec2} startPos
 * Where to start the line.
 *
 * @param {Vec2} controlPos
 * The control point.
 *
 * @param {Vec2} endPos
 * Where to end the line.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export const makeQuadraticCurve = _.curry(function (style, startPos, controlPos, endPos) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.width, style.color.hex, style.color.alpha);
    result.moveTo(startPos.x, startPos.y);
    result.quadraticCurveTo(
        controlPos.x,
        controlPos.y,
        endPos.x,
        endPos.y
    );
    return result;
});

/**
 * Creates a display object of quadratic curve.
 *
 * @param {Object} style
 * How the line should look.
 *
 * @param {Number} style.width
 * The width of the line.
 *
 * @param {Color} style.color
 * The color of the line.
 *
 * @param {Vec2} startPos
 * Where to start the line.
 *
 * @param {Vec2} controlPos1
 * The first control point.
 *
 * @param {Vec2} controlPos2
 * The second control point.
 *
 * @param {Vec2} endPos
 * Where to end the line.
 *
 * @return {DisplayObject}
 * The created display object.
 */
export const makeBezierCurve = _.curry(function (style, startPos, controlPos1, controlPos2, endPos) {
    const result = new PIXI.Graphics();
    result.lineStyle(style.width, style.color.hex, style.color.alpha);
    result.moveTo(startPos.x, startPos.y);
    result.bezierCurveTo(
        controlPos1.x,
        controlPos1.y,
        controlPos2.x,
        controlPos2.y,
        endPos.x,
        endPos.y
    );
    return result;
});

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
            Math.max(displayObject.width, displayObject.height) / Math.sqrt(2) + style.padding
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
 * @param {Object} style
 * How the image should look.
 *
 * @param {Number|String} style.width
 * The width of the image. Set this to "orig" to use the width of the
 * original image and to "auto" to keep the aspect ratio when setting
 * the height.
 *
 * @param {Number|String} style.height
 * The height of the image. Set this to "orig" to use the height of the
 * original image and to "auto" to keep the aspect ratio when setting
 * the width.
 *
 * @param {String} path
 * The location of the image.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
export function makeImage(style, path) {
    const result = PIXI.Sprite.fromImage(path);

    // Adjust width
    if (style.width === "auto") {
        if (style.height !== "auto" || style.height !== "orig") {
            result.width *= style.height / result.height;
        }
    } else if (style.width !== "orig") {
        result.width = style.width;
    }

    // Adjust height
    if (style.height === "auto") {
        if (style.width !== "auto" || style.width !== "orig") {
            result.height *= style.width / result.width;
        }
    } else if (style.height !== "orig") {
        result.height = style.height;
    }

    // Adjust position
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

    switch (style.side) {
    case "above":
        result.y -= (displayObject.height + result.height) / 2 + style.gap; break;
    case "right":
        result.x += (displayObject.width  + result.width)  / 2 + style.gap; break;
    case "below":
        result.y += (displayObject.height + result.height) / 2 + style.gap; break;
    case "left":
        result.x -= (displayObject.width  + result.width)  / 2 + style.gap; break;
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
 * Creates an image with a label.
 *
 * @param {Object} style
 * How everything should look.
 *
 * @param {Object} style.image
 * How the image should look. Refer to the makeImage function to see how this
 * sub-object should be structured.
 *
 * @param {Object} style.caption
 * How the caption should look. Check the documentation of the makeCaption
 * function for further information.
 *
 * @param {String} imagePath
 * The path to the image.
 *
 * @param {String} text
 * The caption text.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
export const makeCaptionedImage = _.curry(function (style, imagePath, text) {
    const result       = new PIXI.Container();
    const illustration = makeImage(style.image, imagePath);
    result.addChild(illustration);

    if (style.captionSide !== "none") {
        const caption  = makeCaption(style.caption, text, illustration);
        result.addChild(caption);

        const centerX = Math.min(illustration.x, caption.x) + result.width  / 2;
        const centerY = Math.min(illustration.y, caption.y) + result.height / 2;
        illustration.x -= centerX;
        illustration.y -= centerY;
        caption.x      -= centerX;
        caption.y      -= centerY;
    }

    return result;
});

/**
 * Adds event handlers to the given display object.
 *
 * @param {Object} conf
 * Contains the event handlers to add.
 *
 * @param {Function} conf.mouseover
 * Is triggered when the mouse moves onto the display object.
 *
 * @param {Function} conf.mouseout
 * Is triggered when the mouse leaves the display object.
 *
 * @param {Function} conf.mousedown
 * Is triggered when the left mousebutton is pressed when the mouse is on the
 * display object.
 *
 * @param {Function} conf.mouseup
 * Is triggered when the left mousebutton is released when the mouse is on the
 * display object.
 *
 * @param {Function} conf.click
 * Is triggered right after the mouseup event.
 *
 * @param {Function} conf.touchstart
 * Is triggered when the display object is touched.
 *
 * @param {Function} conf.touchend
 * Is triggered when the display object is no longer touched.
 *
 * @param {Function} conf.tap
 * Is triggered right after the touchend event.
 *
 * @param {DisplayObject} displayObject
 * The display object to make interactive.
 */
export const addInteraction = _.curry(function (conf, displayObject) {
    displayObject.interactive = true;
    displayObject.buttonMode  = true;
    displayObject.mouseover   = conf.handleMouseover;
    displayObject.mouseout    = conf.handleMouseout;
    displayObject.mousedown   = conf.handleMousedown;
    displayObject.mouseup     = conf.handleMouseup;
    displayObject.click       = conf.handleClick;
    displayObject.touchstart  = conf.handleTouchstart;
    displayObject.touchend    = conf.handleTouchend;
    displayObject.tap         = conf.handleTap;
});

/**
 * Sets the position of the given display object.
 *
 * @param {Vec2} position
 * Where to place the display object.
 *
 * @param {DisplayObject} displayObject
 * The display object to place.
 */
export function setPosition(position, displayObject) {
    displayObject.position.x = position.x;
    displayObject.position.y = position.y;
}

/**
 * Sets the scale of the given display object.
 *
 * @param {Vec2|Number} scale
 * The factor to enlarge or shrink the display object by. If a single number
 * is provided, it is use for the x- and y-directions.
 *
 * @param {DisplayObject} displayObject
 * The display object to scale.
 */
export function setScale(scale, displayObject) {
    if (typeof scale === "number") {
        displayObject.scale.x = scale;
        displayObject.scale.y = scale;
    } else if (typeof scale.x === "number" && typeof scale.y === "number") {
        displayObject.scale.x = scale.x;
        displayObject.scale.y = scale.y;
    }
}

/**
 * Sets the point to rotate the given display object about.
 *
 * @param {Vec2} pivot
 * Where to rotate the display object around.
 *
 * @param {DisplayObject} displayObject
 * The display object to configure.
 */
export function setPivot(pivot, displayObject) {
    displayObject.pivot.x = pivot.x;
    displayObject.pivot.y = pivot.y;
}

/**
 * Sets the rotation angle of the given display object.
 *
 * @param {Vec2} pivot
 * The rotation angle of the display object.
 *
 * @param {DisplayObject} displayObject
 * The display object to rotate.
 */
export function setRotation(angle, displayObject) {
    displayObject.rotation = angle;
}

/**
 * Turns a string into an array of its lines. This is the expected format for
 * the shader source code.
 *
 * @param {String} s
 * The source code of the shader as a string.
 *
 * @return {Array<String>}
 * The split string.
 */
export function shaderStringToArray(s) {
    return s.split("\n").map(s => s.trim()).filter(s => s.length > 0);
}

/**
 * Creates a new event listener covering the two cases, that another event
 * listener exists already and that the opposite is true.
 *
 * @param {*} current
 * The current value of the event handler.
 *
 * @param {Function}
 * The new event handler to register.
 *
 * @return {Function}
 * The created event listener.
 */
export function composeEventListeners(current, next) {
    if (typeof current === "function") {
        return e => {
            current(e);
            next(e);
        };
    } else {
        return next;
    }
}

/**
 * Computes the hit area of the display object.
 *
 * @param {DisplayObject} displayObject
 * The display object to compute the hit area for.
 *
 * @return {Polygon}
 * The hit area.
 */
export function computeHitArea({width: w = 0, height: h = 0, x, y, rotation: alpha = 0}) {
    const v = new Vec2(x, y);
    const points = {
        tl: new Vec2(-w/2, -h/2).rotate(alpha).add(v),
        tr: new Vec2( w/2, -h/2).rotate(alpha).add(v),
        br: new Vec2( w/2,  h/2).rotate(alpha).add(v),
        bl: new Vec2(-w/2,  h/2).rotate(alpha).add(v),
    };

    return new PIXI.Polygon([
        points.tl.x, points.tl.y,
        points.tr.x, points.tr.y,
        points.br.x, points.br.y,
        points.bl.x, points.bl.y
    ]);;
}
