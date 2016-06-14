import {predefinedColors} from "@ignavia/util";

import registry   from "../../registry.js";
import * as utils from "../../utils.js";

/**
 * The default configuration of this style.
 *
 * @type {Object}
 */
export const defaultConf = {

    /**
     * The content of the table.
     *
     * @type {Object}
     *
     * @property {Array} content.headers
     * The headers of the table.
     *
     * @property {Array} content.data
     * A two-dimensional array of the data. Each entry represents one row.
     */
    content: {
        headers: [],
        data:    [],
    },

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

/**
 * Creates a sprite using the given configuration.
 *
 * @param {Object} [conf]
 * Check the documentation of the default configuration for the structure of
 * this object.
 *
 * @return {DisplayObject}
 * The created sprite.
 */
export default function makeSprite(conf = {}) {
    conf = utils.adjustConf(defaultConf, conf);

    const container = makeContainer(conf, conf.content);
    const result    = utils.makeCanvasSprite(container);

    // Placing the texture at the origin of the coordinate system of the sprite
    result.anchor = {
        x: 0.5,
        y: 0.5
    };

    return result;
};
registry.addNodeStyle("table", makeSprite);

/**
 * Creates the container that is used to make the final sprite.
 *
 * @param {Object} conf
 * The configuration of this style.
 *
 * @param {Object} content
 * The content of the table.
 */
function makeContainer(conf, content) {
    const {labels, columnWidths, rowHeights} = makeLabels(conf, content);

    const width  = computeWidth(conf, columnWidths);
    const height = computeHeight(conf, rowHeights);

    positionLabels(conf, labels, columnWidths, rowHeights, width, height);

    const box     = makeBox(conf, rowHeights[0], width, height);
    const borders = makeBorders(conf, columnWidths, rowHeights, width, height);

    const result = new PIXI.Container();
    result.addChild(box);
    result.addChild(borders);
    for (let row of labels) {
        for (let label of row) {
            result.addChild(label);
        }
    }

    return result;
}

/**
 * Creates the display objects for the labels.
 *
 * @param {Object} conf
 * The configuration of this style.
 *
 * @param {Object} content
 * The content of the table.
 *
 * @return {Object}
 * You can find the created display objects in a two-dimensional array under
 * the labels key. Furthermore, the returned object has a columnWidths and a
 * rowHeight property.
 */
function makeLabels(conf, content) {
    const labels       = [[]];
    const columnWidths = [];
    const rowHeights   = [];

    // Header
    for (let c = 0; c < content.headers.length; c++) {
        const label     = utils.makeText(conf.headerCell.text, content.headers[c]);
        labels[0][c]    = label;
        columnWidths[c] = adjustDimension(conf, columnWidths[c], label.width);
        rowHeights[0]   = adjustDimension(conf, rowHeights[0],   label.height);
    }

    // Data
    for (let r = 1; r <= content.data.length; r++) {
        labels[r] = [];
        for (let c = 0; c < content.data[r - 1].length; c++) {
            const label     = utils.makeText(conf.dataCell.text, content.data[r - 1][c]);
            labels[r][c]    = label;
            columnWidths[c] = adjustDimension(conf, columnWidths[c], label.width);
            rowHeights[r]   = adjustDimension(conf, rowHeights[r],   label.height);
        }
    }

    return {labels, columnWidths, rowHeights};
}

/**
 * Moves the labels to the correct positions.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @param {Array} labels
 * The display objects of the labels.
 *
 * @param {Array} columnWidths
 * The widths of the columns.
 *
 * @param {Array} rowHeights
 * The heights of the rows.
 *
 * @param {Number} width
 * The width of the complete table.
 *
 * @param {Number} height
 * The height of the complete table.
 */
function positionLabels(conf, labels, columnWidths, rowHeights, width, height) {
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

/**
 * Creates the borders of the table.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @param {Array} columnWidths
 * The widths of the columns.
 *
 * @param {Array} rowHeights
 * The heights of the rows.
 *
 * @param {Number} width
 * The width of the complete table.
 *
 * @param {Number} height
 * The height of the complete table.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
function makeBorders(conf, columnWidths, rowHeights, width, height) {
    const result = new PIXI.Container();

    if (conf.border.vertical){
        result.addChild(makeVerticalBorders(conf, columnWidths, width, height));
    }
    if (conf.border.horizontal) {
        result.addChild(makeHorizontalBorders(conf, rowHeights, width, height));
    }
    if (conf.border.around) {
        result.addChild(makeBorderAround(conf, width, height));
    }

    return result;
}

/**
 * Creates the vertical borders of the table.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @param {Array} columnWidths
 * The widths of the columns.
 *
 * @param {Number} width
 * The width of the complete table.
 *
 * @param {Number} height
 * The height of the complete table.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
function makeVerticalBorders(conf, columnWidths, width, height) {
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

/**
 * Creates the horizontal borders of the table.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @param {Array} rowHeights
 * The heights of the rows.
 *
 * @param {Number} width
 * The width of the complete table.
 *
 * @param {Number} height
 * The height of the complete table.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
function makeHorizontalBorders(conf, rowHeights, width, height) {
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

/**
 * Creates the borders of the table.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @param {Number} width
 * The width of the complete table.
 *
 * @param {Number} height
 * The height of the complete table.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
function makeBorderAround(conf, width, height) {
    const result = new PIXI.Graphics();
    result.lineStyle(conf.border.width, conf.border.color.hex, conf.border.color.alpha);

    result.moveTo(-width / 2 - conf.border.width / 2, -height / 2 - conf.border.width / 2);
    result.lineTo( width / 2 + conf.border.width / 2, -height / 2 - conf.border.width / 2);
    result.lineTo( width / 2 + conf.border.width / 2,  height / 2 + conf.border.width / 2);
    result.lineTo(-width / 2 - conf.border.width / 2,  height / 2 + conf.border.width / 2);
    result.lineTo(-width / 2 - conf.border.width / 2, -height / 2 - conf.border.width / 2);

    return result;
}

/**
 * Computes the width of the table not including the border around the
 * table.
 *
 * @param {Object} conf
 * The configuration of this style.
 *
 * @param {Array} columnWidths
 * The widths of the individual columns.
 *
 * @return {Number}
 * The width.
 */
function computeWidth(conf, columnWidths) {
    let result = _.sum(columnWidths);
    if (conf.border.vertical) {
        result += (columnWidths.length - 1) * conf.border.width;
    }
    return result;
}

/**
 * Computes the height of the table not including the border around the
 * table.
 *
 * @param {Object} conf
 * The configuration of this style.
 *
 * @param {Array} columnWidths
 * The heights of the individual rows.
 *
 * @return {Number}
 * The height.
 */
function computeHeight(conf, rowHeights) {
    let result = _.sum(rowHeights);
    if (conf.border.horizontal) {
        result += (rowHeights.length - 1) * conf.border.width;
    }
    return result;
}

/**
 * Creates the box for the background-color of the table.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @param {Number} headerRowHeight
 * The height of the header row.
 *
 * @param {Number} width
 * The width of the complete table.
 *
 * @param {Number} height
 * The height of the complete table.
 *
 * @return {DisplayObject}
 * The resulting display object.
 */
function makeBox(conf, headerRowHeight, width, height) {
    const result = new PIXI.Graphics();

    // Header
    result.beginFill(conf.headerCell.backgroundColor.hex, conf.headerCell.backgroundColor.alpha);
    result.drawRect(
        -width  / 2,
        -height / 2,
        width,
        headerRowHeight
    );

    // Data
    result.beginFill(conf.dataCell.backgroundColor.hex, conf.dataCell.backgroundColor.alpha);
    result.drawRect(
        -width  / 2,
        -height / 2 + headerRowHeight,
        width,
        height - headerRowHeight
    );

    return result;
}

/**
 * Returns the maximum of the old row height/columnwidth and the current cell
 * height/width. It also adds the padding from the settings.
 *
 * @param {Object} conf
 * The configuration of the style.
 *
 * @param {Number} old
 * The old maximum dimension.
 *
 * @param {Number} current
 * The current dimension.
 */
function adjustDimension(conf, old, current) {
    current = current + 2 * conf.padding;
    if (old === undefined) {
        return current;
    }
    return Math.max(old, current);
}
