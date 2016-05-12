export default class TableStyle {

}

LabelledStyle.default = {
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
    padding: {
        cell: 10,
        around: 0
    },
    margin: {
        cell: 2,
        around: 0
    },

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
