import _ from "lodash";

import {Vec2Builder}      from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

export default class TableStyle {
    constructor(conf) {
        _.merge(this, TableStyle.default, conf);
    }

    makeDisplayObject(nodeObj, graphicalComponent, conf = TableStyle.default) {
        const container = this.makeContainer(conf);
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
    }

    makeContainer(conf) {
        const container = new PIXI.Container();

        const {labels, columnWidths, rowHeights} = this.makeLabels(conf);

        const width  = this.computeWidth(columnWidths, conf);
        const height = this.computeHeight(rowHeights, conf);

        this.positionLabels(labels, columnWidths, rowHeights, width, height, conf);

        const box = this.makeBox(rowHeights[0], width, height, conf);
        const borders = this.makeBorders(columnWidths, rowHeights, width, height, conf);

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

    makeBorders(columnWidths, rowHeights, width, height, conf) {
        const result = new PIXI.Container();

        if (conf.border.vertical){
            result.addChild(this.makeVerticalBorders(columnWidths, width, height, conf));
        }

        if (conf.border.horizontal) {
            result.addChild(this.makeHorizontalBorders(rowHeights, width, height, conf));
        }

        if (conf.border.around) {
            result.addChild(this.makeBorderAround(width, height, conf));
        }

        return result;
    }

    makeVerticalBorders(columnWidths, width, height, conf) {
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

    makeHorizontalBorders(rowHeights, width, height, conf) {
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

    makeBorderAround(width, height, conf) { // move outside
        const result = new PIXI.Graphics();
        result.lineStyle(conf.border.width, conf.border.color.hex, conf .border.color.alpha);

        result.moveTo(-width / 2 - conf.border.width / 2, -height / 2 - conf.border.width / 2);
        result.lineTo( width / 2 + conf.border.width / 2, -height / 2 - conf.border.width / 2);
        result.lineTo( width / 2 + conf.border.width / 2,  height / 2 + conf.border.width / 2);
        result.lineTo(-width / 2 - conf.border.width / 2,  height / 2 + conf.border.width / 2);
        result.lineTo(-width / 2 - conf.border.width / 2, -height / 2 - conf.border.width / 2);

        return result;
    }

    positionLabels(labels, columnWidths, rowHeights, width, height, conf) {
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

    computeWidth(columnWidths, conf) {
        let result = _.sum(columnWidths);

        if (conf.border.vertical) {
            result += (columnWidths.length - 1) * conf.border.width;
        }

        return result;
    }

    computeHeight(rowHeights, conf) {
        let result = _.sum(rowHeights);

        if (conf.border.horizontal) {
            result += (rowHeights.length - 1) * conf.border.width;
        }

        return result;
    }

    makeBox(headerRowHeight, width, height, conf) {
        const result = new PIXI.Graphics();

        result.beginFill(conf.backgroundColor.header.hex, conf.backgroundColor.header.alpha);
        result.drawRect(
            -width  / 2,
            -height / 2,
             width,
             headerRowHeight
        );

        result.beginFill(conf.backgroundColor.data.hex, conf.backgroundColor.data.alpha);
        result.drawRect(
            -width  / 2,
            -height / 2 + headerRowHeight,
             width,
             height - headerRowHeight
        );

        return result;
    }

    makeLabels(conf) {
        const labels       = [[]];
        const columnWidths = [];
        const rowHeights   = [];

        // Header
        for (let c = 0; c < conf.headers.length; c++) {
            const label     = this.makeLabel(conf.headers[c], conf.text.header);
            labels[0][c]    = label;
            columnWidths[c] = this.adjustDimension(columnWidths[c], label.width, conf);
            rowHeights[0]   = this.adjustDimension(rowHeights[0],   label.height, conf);
        }

        // Data
        for (let r = 1; r <= conf.data.length; r++) {
            labels[r] = [];
            for (let c = 0; c < conf.data[r - 1].length; c++) {
                const label     = this.makeLabel(conf.data[r - 1][c], conf.text.data);
                labels[r][c]    = label;
                columnWidths[c] = this.adjustDimension(columnWidths[c], label.width, conf);
                rowHeights[r]   = this.adjustDimension(rowHeights[r],   label.height, conf);
            }
        }

        return {labels, columnWidths, rowHeights};
    }

    adjustDimension(old, current, conf) {
        current = current + 2 * conf.padding;
        if (old === undefined) {
            return current;
        }
        return Math.max(old, current);
    }

    makeLabel(content, conf) {
        const result = new PIXI.Text(content, {
            align:              conf.align,
            dropShadow:         conf.dropShadow.distance > 0,
            dropShadowAngle:    conf.dropShadow.angle,
            dropShadowColor:    conf.dropShadow.color.hex,
            dropShadowDistance: conf.dropShadow.distance,
            fill:               conf.fill.hex,
            font:               `${conf.font.weight} ${conf.font.style} ${conf.font.size}px ${conf.font.family}`,
            stroke:             conf.stroke.hex,
            strokeThickness:    conf.strokeThickness,
            wordWrap:           conf.wordWrapWidth > 0,
            wordWrapWidth:      conf.wordWrapWidth
        });
        result.x = -result.width  / 2;
        result.y = -result.height / 2;
        return result;
    }
}

TableStyle.default = {
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
            fill: predefinedColors.black,
            font: {
                family: "Arial",
                size:   24,
                style:  "normal",
                weight: "bold"
            },
            stroke:          predefinedColors.white,
            strokeThickness: 0,
            textBaseline:    "center",
            wordWrapWidth:   0
        },
        data: {
            align:  "left",
            dropShadow: {
                angle:    Math.PI / 4,
                color:    predefinedColors.gray,
                distance: 0
            },
            fill: predefinedColors.black,
            font: {
                family: "Arial",
                size:   20,
                style:  "normal",
                weight: "normal"
            },
            stroke:          predefinedColors.white,
            strokeThickness: 0,
            textBaseline:    "center",
            wordWrapWidth:   0
        }
    },

    /**
     * The height of this node. This can either be a number or the string
     * "auto".
     *
     * @type {Number|String}
     */
    height: "auto",

    /**
     * The width of this node. This can either be a number or the string
     * "auto".
     *
     * @type {Number|String}
     */
    width: "auto",

    /**
     * Whether to show the sprite.
     *
     * @type {Boolean}
     */
    visible: true,

    /**
     * Nodes with a higher value are going to be shown on top of others.
     *
     * @type {Number}
     */
    zIndex: 0
};
