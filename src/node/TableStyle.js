import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

/**
 * The default configuration of this style.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * How the header cells should look.
     *
     * @type {Object}
     */
    headerCell: {

        /**
         * The background-color of header cells.
         *
         * @type {Color}
         */
        backgroundColor: predefinedColors.lightgray,

        /**
         * The style of the text of the header cells.
         *
         * @type {Object}
         */
        text: {

            /**
             * How the text should be aligned. The possible values are "left", "center" and
             * "right". For a single line of text this option has no effect.
             *
             * @type {String}
             */
            align: "left",

            /**
             * How the drop shadow of the text should look.
             *
             * @type {Object}
             */
            dropShadow: {

                /**
                 * The angle of the drop shadow given in radian. An angle of 0 means that the
                 * shadow goes to the right, increasing the angle moves the shadow clockwise.
                 *
                 * @type {Number}
                 */
                angle: Math.PI / 4,

                /**
                 * The color of the shadow.
                 *
                 * @type {Color}
                 */
                color: predefinedColors.gray,

                /**
                 * How long the drop shadow should be. Set this to 0 to remove it.
                 *
                 * @type {Number}
                 */
                distance: 0
            },

            /**
             * The color to fill the text with.
             *
             * @type {Color}
             */
            fillColor: predefinedColors.black,

            /**
             * Configures the font of the text.
             *
             * @type {Object}
             */
            font: {

                /**
                 * The font-family to use.
                 *
                 * @type {String}
                 */
                family: "Arial",

                /**
                 * The font-size to use.
                 *
                 * @type {Number}
                 */
                size: 20,

                /**
                 * The style of the font. This can either be "normal", "italic" or "oblique".
                 *
                 * @type {String}
                 */
                style: "normal",

                /**
                 * The weight of the font. This can either be "light", "normal" or "bold".
                 */
                weight: "bold"
            },

            /**
             * How the stroke around the text should look.
             *
             * @type {Object}
             */
            stroke: {

                /**
                 * The color of the stroke around the text.
                 *
                 * @type {Color}
                 */
                color: predefinedColors.white,

                /**
                 * How thick the stroke should be. Set this to 0 to deactivate it.
                 *
                 * @type {Number}
                 */
                thickness: 0
            },

            /**
             * The width at which the text is going to wrap. Set this to 0 to
             * disable it.
             *
             * @type {Number}
             */
            wordWrapWidth: 0
        }
    },

    /**
     * The styling of data cells.
     *
     * @type {Object}
     */
    dataCell: {

        /**
         * The background-color of the data cells.
         *
         * @type {Color}
         */
        backgroundColor: predefinedColors.white,

        /**
         * The style of the text of a data cell.
         *
         * @type {Object}
         */
        text: {

            /**
             * How the text should be aligned. The possible values are "left", "center" and
             * "right". For a single line of text this option has no effect.
             *
             * @type {String}
             */
            align: "left",

            /**
             * How the drop shadow of the text should look.
             *
             * @type {Object}
             */
            dropShadow: {

                /**
                 * The angle of the drop shadow given in radian. An angle of 0 means that the
                 * shadow goes to the right, increasing the angle moves the shadow clockwise.
                 *
                 * @type {Number}
                 */
                angle: Math.PI / 4,

                /**
                 * The color of the shadow.
                 *
                 * @type {Color}
                 */
                color: predefinedColors.gray,

                /**
                 * How long the drop shadow should be. Set this to 0 to remove it.
                 *
                 * @type {Number}
                 */
                distance: 0
            },

            /**
             * The color to fill the text with.
             *
             * @type {Color}
             */
            fillColor: predefinedColors.black,

            /**
             * Configures the font of the text.
             *
             * @type {Object}
             */
            font: {

                /**
                 * The font-family to use.
                 *
                 * @type {String}
                 */
                family: "Arial",

                /**
                 * The font-size to use.
                 *
                 * @type {Number}
                 */
                size: 16,

                /**
                 * The style of the font. This can either be "normal", "italic" or "oblique".
                 *
                 * @type {String}
                 */
                style: "normal",

                /**
                 * The weight of the font. This can either be "light", "normal" or "bold".
                 */
                weight: "bold"
            },

            /**
             * How the stroke around the text should look.
             *
             * @type {Object}
             */
            stroke: {

                /**
                 * The color of the stroke around the text.
                 *
                 * @type {Color}
                 */
                color: predefinedColors.white,

                /**
                 * How thick the stroke should be. Set this to 0 to deactivate it.
                 *
                 * @type {Number}
                 */
                thickness: 0
            },

            /**
             * The width at which the text is going to wrap. Set this to 0 to
             * disable it.
             *
             * @type {Number}
             */
            wordWrapWidth: 0
        }
    },

    /**
     * How the border between cells and around the table should look.
     *
     * @type {Object}
     */
    border: {

        /**
         * The color of the border.
         *
         * @type {Color}
         */
        color: predefinedColors.black,

        /**
         * The width of the border:
         *
         * @type {Number}
         */
        width: 2,

        /**
         * Whether to show vertical borders.
         *
         * @type {Boolean}
         */
        vertical: true,

        /**
         * Whether to show horizontal borders.
         *
         * @type {Boolean}
         */
        horizontal: true,

        /**
         * Whether to show a border around the table.
         */
        around: true
    },

    /**
     * The padding around the text in cells.
     *
     * @type {Number}
     */
    padding: 10
};

export const makeSprite = _.curry(function(conf, content) {
    const container = makeContainer(conf, content);
    const result    = Utils.makeCanvasSprite(container);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
});

export const makeSpriteWithDefaultConf = makeSprite(defaultConf);

function makeContainer(conf, content) {
    const container = new PIXI.Container();

    const {labels, columnWidths, rowHeights} = makeLabels(conf, content);

    const width  = computeWidth(columnWidths, conf);
    const height = computeHeight(rowHeights, conf);

    positionLabels(labels, columnWidths, rowHeights, width, height, conf);

    const box = makeBox(rowHeights[0], width, height, conf);
    const borders = makeBorders(columnWidths, rowHeights, width, height, conf);

    container.addChild(box);
    container.addChild(borders);
    for (let row of labels) {
        for (let label of row) {
            container.addChild(label);
        }
    }

    return container;
}

function makeBorders(columnWidths, rowHeights, width, height, conf) {
    const result = new PIXI.Container();

    if (conf.border.vertical){
        result.addChild(makeVerticalBorders(columnWidths, width, height, conf));
    }

    if (conf.border.horizontal) {
        result.addChild(makeHorizontalBorders(rowHeights, width, height, conf));
    }

    if (conf.border.around) {
        result.addChild(makeBorderAround(width, height, conf));
    }

    return result;
}

function makeVerticalBorders(columnWidths, width, height, conf) {
    const result = new PIXI.Graphics();
    result.lineStyle(conf.border.width, conf.border.color.hex, conf.border.color.alpha);

    let curX = -width / 2 - conf.border.width / 2;
    for (let c = 0; c < columnWidths.length - 1; c++) {
        curX += columnWidths[c] + conf.border.width;
        result.moveTo(curX, -height / 2);
        result.lineTo(curX,  height / 2);
    }

    return result;
}

function makeHorizontalBorders(rowHeights, width, height, conf) {
    const result = new PIXI.Graphics();
    result.lineStyle(conf.border.width, conf.border.color.hex, conf.border.color.alpha);

    let curY = -height / 2 - conf.border.width / 2;
    for (let r = 0; r < rowHeights.length - 1; r++) {
        curY += rowHeights[r] + conf.border.width;
        result.moveTo(-width / 2, curY);
        result.lineTo( width / 2, curY);
    }

    return result;
}

function makeBorderAround(width, height, conf) {
    const result = new PIXI.Graphics();
    result.lineStyle(conf.border.width, conf.border.color.hex, conf.border.color.alpha);

    result.moveTo(-width / 2 - conf.border.width / 2, -height / 2 - conf.border.width / 2);
    result.lineTo( width / 2 + conf.border.width / 2, -height / 2 - conf.border.width / 2);
    result.lineTo( width / 2 + conf.border.width / 2,  height / 2 + conf.border.width / 2);
    result.lineTo(-width / 2 - conf.border.width / 2,  height / 2 + conf.border.width / 2);
    result.lineTo(-width / 2 - conf.border.width / 2, -height / 2 - conf.border.width / 2);

    return result;
}

function positionLabels(labels, columnWidths, rowHeights, width, height, conf) {
    let curY = (rowHeights[0] || 0) / 2 - height / 2;
    for (let r = 0; r < labels.length; r++) {

        let curX = (columnWidths[0] || 0) / 2 - width / 2;
        for (let c = 0; c < labels[r].length; c++) {
            labels[r][c].x += curX;
            labels[r][c].y += curY;

            curX += columnWidths[c] / 2 +
                    (conf.border.vertical ? conf.border.width : 0) +
                    (columnWidths[c + 1] || 0) / 2;
        }

        curY += rowHeights[r] / 2 +
                (conf.border.horizontal ? conf.border.width : 0) +
                (rowHeights[r + 1] || 0) / 2;
    }
}

function computeWidth(columnWidths, conf) {
    let result = _.sum(columnWidths);

    if (conf.border.vertical) {
        result += (columnWidths.length - 1) * conf.border.width;
    }

    return result;
}

function computeHeight(rowHeights, conf) {
    let result = _.sum(rowHeights);

    if (conf.border.horizontal) {
        result += (rowHeights.length - 1) * conf.border.width;
    }

    return result;
}

function makeBox(headerRowHeight, width, height, conf) {
    const result = new PIXI.Graphics();

    result.beginFill(conf.headerCell.backgroundColor.hex, conf.headerCell.backgroundColor.alpha);
    result.drawRect(
        -width  / 2,
        -height / 2,
        width,
        headerRowHeight
    );

    // TODO: use Utils ?

    result.beginFill(conf.dataCell.backgroundColor.hex, conf.dataCell.backgroundColor.alpha);
    result.drawRect(
        -width  / 2,
        -height / 2 + headerRowHeight,
        width,
        height - headerRowHeight
    );

    return result;
}

function makeLabels(conf, content) {
    const labels       = [[]];
    const columnWidths = [];
    const rowHeights   = [];

    // Header
    for (let c = 0; c < content.headers.length; c++) {
        const label     = Utils.makeText(conf.headerCell.text, content.headers[c]);
        labels[0][c]    = label;
        columnWidths[c] = adjustDimension(columnWidths[c], label.width, conf);
        rowHeights[0]   = adjustDimension(rowHeights[0],   label.height, conf);
    }

    // Data
    for (let r = 1; r <= content.data.length; r++) {
        labels[r] = [];
        for (let c = 0; c < content.data[r - 1].length; c++) {
            const label     = Utils.makeText(conf.dataCell.text, content.data[r - 1][c]);
            labels[r][c]    = label;
            columnWidths[c] = adjustDimension(columnWidths[c], label.width, conf);
            rowHeights[r]   = adjustDimension(rowHeights[r],   label.height, conf);
        }
    }

    return {labels, columnWidths, rowHeights};
}

function adjustDimension(old, current, conf) {
    current = current + 2 * conf.padding;
    if (old === undefined) {
        return current;
    }
    return Math.max(old, current);
}
