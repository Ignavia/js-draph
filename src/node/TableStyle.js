import _ from "lodash";

import {Vec2Builder}      from "@ignavia/ella";
import {predefinedColors} from "@ignavia/util";

import * as Utils from "../Utils.js";

export default class TableStyle {
    constructor(conf) {
        _.merge(this, TableStyle.default, conf);
    }

    makeDisplayObject(nodeObj, graphicalComponent) {
        const container = this.makeContainer();
        const sprite    = Utils.makeCanvasSprite(container, {
            width:  this.width,
            height: this.height
        });

        sprite.visible = this.visible;

        // Placing the texture at the origin of the coordinate system of the sprite
        sprite.anchor = {
            x: 0.5,
            y: 0.5
        };

        return sprite;
    }

    makeContainer() {
        const container = new PIXI.Container();

        const {labels, columnWidths, rowHeights} = this.makeLabels();

        const width  = this.computeWidth(columnWidths);
        const height = this.computeHeight(rowHeights);

        this.positionLabels(labels, columnWidths, rowHeights, width, height);

        const box = this.makeBox(width, height);
        const borders = this.makeBorders(columnWidths, rowHeights, width, height);

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

    makeBorders(columnWidths, rowHeights, width, height) {
        const result = new PIXI.Container();

        if (this.border.vertical){
            result.addChild(this.makeVerticalBorders(columnWidths, width, height));
        }

        if (this.border.horizontal) {
            result.addChild(this.makeHorizontalBorders(rowHeights, width, height));
        }

        if (this.border.around) {
            result.addChild(this.makeBorderAround(width, height));
        }

        return result;
    }

    makeVerticalBorders(columnWidths, width, height) {
        const result = new PIXI.Graphics();
        result.lineStyle(this.border.width, this.border.color.hex, this.border.color.alpha);

        let curX = -width / 2;
        for (let c = 0; c < columnWidths.length - 1; c++) {
            curX += columnWidths[c];
            result.moveTo(curX, 0);
            result.lineTo(curX, height);
        }

        return result;
    }

    makeHorizontalBorders(rowHeights, width, height) {
        const result = new PIXI.Graphics();
        result.lineStyle(this.border.width, this.border.color.hex, this.border.color.alpha);

        let curY = -height / 2;
        for (let r = 0; r < rowHeights.length - 1; r++) {
            curY += rowHeights[r];
            result.moveTo(0,     curY);
            result.lineTo(width, curY);
        }

        return result;
    }

    makeBorderAround(width, height) {
        const result = new PIXI.Graphics();
        result.lineStyle(this.border.width, this.border.color.hex, this.border.color.alpha);

        result.moveTo(-width / 2, -height / 2);
        result.lineTo( width / 2, -height / 2);
        result.lineTo( width / 2,  height / 2);
        result.lineTo(-width / 2,  height / 2);
        result.lineTo(-width / 2, -height / 2);

        return result;
    }

    positionLabels(labels, columnWidths, rowHeights, width, height) {
        let curY = (rowHeights[0] || 0) / 2 - height / 2;
        for (let r = 0; r < labels.length; r++) {

            let curX = (columnWidths[0] || 0) / 2 - width / 2;
            for (let c = 0; c < labels[r].length; c++) {
                labels.x += curX;
                labels.y += curY;

                curX += columnWidths[c] / 2 +
                        this.border.vertical ? this.border.width : 0 +
                        (columnWidths[c + 1] || 0) / 2;
            }

            curY += rowHeights[r] / 2 +
                    this.border.horizontal ? this.border.width : 0 +
                    (rowHeights[r + 1] || 0) / 2;
        }
    }

    computeWidth(columnWidths) {
        let result = _.sum(columnWidths);

        if (this.border.vertical) {
            result += (columnWidths.length - 1) * this.border.width;
        }

        return result;
    }

    computeHeight(rowHeights) {
        let result = _.sum(rowHeights);

        if (this.border.horizontal) {
            result += (rowHeights.length - 1) * this.border.width;
        }

        return result;
    }

    makeBox(width, height) {
        const result = new PIXI.Graphics();

        result.beginFill(this.backgroundColor.hex, this.backgroundColor.alpha);
        result.drawRect(
            -width  / 2,
            -height / 2,
             width,
             height
        );

        return result;
    }

    makeLabels() {
        const labels       = [[]];
        const columnWidths = [];
        const rowHeights   = [];

        // Header
        for (let c = 0; c < this.headers.length; c++) {
            const label     = this.makeLabel(this.headers[c], this.text.header);
            labels[0][c]    = label;
            columnWidths[c] = this.adjustDimension(columnWidths[c], label.width);
            rowHeights[0]   = this.adjustDimension(rowHeights[0],   label.height);
        }

        // Data
        for (let r = 0; r < this.data.length; r++) {
            labels[r] = [];
            for (let c = 0; c < this.data[r].length; c++) {
                const label     = this.makeLabel(this.data[r][c], this.text.data);
                labels[r][c]    = label;
                columnWidths[r] = this.adjustDimension(columnWidths[r], label.width);
                rowHeights[c]   = this.adjustDimension(rowHeights[c],   label.height);
            }
        }

        return {labels, columnWidths, rowHeights};
    }

    adjustDimension(old, current) {
        current = current + 2 * this.padding;
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
    headers: ["<Placeholder>"],
    data:    [["<Placeholder>"]],
    backgroundColor: predefinedColors.white,
    border: {
        color:  predefinedColors.black,
        radius: 5,
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
