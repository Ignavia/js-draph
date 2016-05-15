import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

export const defaultConf = {
    headers: ["<Placeholder>", "<Header>"],
    data:    [["<Placeholder>", "Test"], ["<Placeholder>"], ["<Placeholder>"], ["<Placeholder>"]],
    backgroundColor: {
        header: predefinedColors.lightgray,
        data:   predefinedColors.white
    },
    border: {
        color:  predefinedColors.black,
        width:  2,
        vertical:   true,
        horizontal: true,
        around:     true
    },
    padding: 10,

    text: {
        header: {
            align:  "left",
            dropShadow: {
                angle:    Math.PI / 4,
                color:    predefinedColors.gray,
                distance: 0
            },
            fillColor: predefinedColors.black,
            font: {
                family: "Arial",
                size:   24,
                style:  "normal",
                weight: "bold"
            },
            stroke: {
                color: predefinedColors.white,
                thickness: 0
            },
            wordWrapWidth:   0
        },
        data: {
            align:  "left",
            dropShadow: {
                angle:    Math.PI / 4,
                color:    predefinedColors.gray,
                distance: 0
            },
            fillColor: predefinedColors.black,
            font: {
                family: "Arial",
                size:   20,
                style:  "normal",
                weight: "normal"
            },
            stroke: {
                color: predefinedColors.white,
                thickness: 0
            },
            wordWrapWidth:   0
        }
    }
};

export const makeSprite = _.curry(function(conf, content) {
    const container = makeContainer(conf);
    const sprite    = Utils.makeCanvasSprite(container, {
        width:  conf.width,
        height: conf.height
    });

    sprite.visible = conf.visible;

    // Placing the texture at the origin of the coordinate system of the sprite
    sprite.anchor = {
        x: 0.5,
        y: 0.5
    };

    return sprite;
});

export const makeSpriteWithDefaultConf = makeSprite(defaultConf);

function makeContainer(conf) {
    const container = new PIXI.Container();

    const {labels, columnWidths, rowHeights} = makeLabels(conf);

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

    // draw box, border, labels

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
    result.lineStyle(conf.border.width, conf.border.color.hex, conf .border.color.alpha);

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

    result.beginFill(conf.backgroundColor.header.hex, conf.backgroundColor.header.alpha);
    result.drawRect(
        -width  / 2,
        -height / 2,
        width,
        headerRowHeight
    );

    // TODO: use Utils ?

    result.beginFill(conf.backgroundColor.data.hex, conf.backgroundColor.data.alpha);
    result.drawRect(
        -width  / 2,
        -height / 2 + headerRowHeight,
        width,
        height - headerRowHeight
    );

    return result;
}

function makeLabels(conf) {
    const labels       = [[]];
    const columnWidths = [];
    const rowHeights   = [];

    // Header
    for (let c = 0; c < conf.headers.length; c++) {
        const label     = Utils.makeText(conf.headers[c], conf.text.header);
        labels[0][c]    = label;
        columnWidths[c] = adjustDimension(columnWidths[c], label.width, conf);
        rowHeights[0]   = adjustDimension(rowHeights[0],   label.height, conf);
    }

    // Data
    for (let r = 1; r <= conf.data.length; r++) {
        labels[r] = [];
        for (let c = 0; c < conf.data[r - 1].length; c++) {
            const label     = Utils.makeText(conf.data[r - 1][c], conf.text.data);
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
