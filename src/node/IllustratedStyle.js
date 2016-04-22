import _ from "lodash";

import {predefinedColors} from "@ignavia/util";

import Style from "./Style.js";

export default class IllustratedStyle extends Style {
    constructor() {
        super();
        _.merge(this, LabelledStyle.default, conf);
    }

    makeContainer() {
        const result = new PIXI.Container();
        return result;
    }

    makeIllustration() {

    }

    makeCaption() {

    }

    makeDisplayObject(nodeObj, graphicalComponent) {
        const container = this.makeContainer();
        const texture   = container.generateTexture(graphicalComponent.canvasRenderer);
        const sprite    = new PIXI.Sprite(texture);
    }
}

IllustratedStyle.default = {
    texture: null, // TODO: proper default image (draph)

    border: {
        color:  predefinedColors.black,
        radius: 5,
        width:  2
    },

    caption: "<Placeholder>",
    captionSide: "below", // below, above, left, right, center, none

    text: {
        align:  "left",
        dropShadow: {
            angle:    Math.PI / 4,
            color:    predefinedColors.gray,
            distance: 0
        },
        fill: predefinedColors.black,
        font: {
            family: "Arial",
            size:   12,
            style:  "normal",
            weight: "bold"
        },
        stroke:          predefinedColors.white,
        strokeThickness: 0,
        wordWrapWidth:   0
    }
};


/*
background  Sets or returns all the background properties in one declaration    1
backgroundAttachment    Sets or returns whether a background-image is fixed or scrolls with the page    1
backgroundColor Sets or returns the background-color of an element  1
backgroundImage Sets or returns the background-image for an element 1
backgroundPosition  Sets or returns the starting position of a background-image 1
backgroundRepeat    Sets or returns how to repeat (tile) a background-image 1
backgroundClip  Sets or returns the painting area of the background 3
backgroundOrigin    Sets or returns the positioning area of the background images   3
backgroundSize  Sets or returns the size of the background image    3

borderCollapse  Sets or returns whether the table border should be collapsed into a single border, or not   2
borderSpacing   Sets or returns the space between cells in a table  2
borderStyle Sets or returns the style of an element's border (can have up to four values)   1

boxShadow   Attaches one or more drop-shadows to the box    3
boxSizing   Allows you to define certain elements to fit an area in a certain way   3
captionSide Sets or returns the position of the table caption   2
clip    Sets or returns which part of a positioned element is visible   2
color   Sets or returns the color of the text   1
cursor  Sets or returns the type of cursor to display for the mouse pointer 2
direction   Sets or returns the text direction  2
display Sets or returns an element's display type   1
emptyCells  Sets or returns whether to show the border and background of empty cells, or not    2
filter  Sets or returns image filters (visual effects, like blur and saturation)    3

font    Sets or returns fontStyle, fontVariant, fontWeight, fontSize, lineHeight, and fontFamily in one declaration 1
fontStyle   Sets or returns whether the style of the font is normal, italic or oblique  1
fontVariant Sets or returns whether the font should be displayed in small capital letters   1
fontWeight  Sets or returns the boldness of the font    1
fontSizeAdjust  Preserves the readability of text when font fallback occurs 3
fontStretch Selects a normal, condensed, or expanded face from a font family    3

imageOrientation    Specifies a rotation in the right or clockwise direction that a user agent applies to an image  3
justifyContent  Sets or returns the alignment between the items inside a flexible container when the items do not use all available space.  3
letterSpacing   Sets or returns the space between characters in a text  1
lineHeight  Sets or returns the distance between lines in a text    1
listStyle   Sets or returns listStyleImage, listStylePosition, and listStyleType in one declaration 1
listStyleImage  Sets or returns an image as the list-item marker    1
listStylePosition   Sets or returns the position of the list-item marker    1
listStyleType   Sets or returns the list-item marker type   1
margin  Sets or returns the margins of an element (can have up to four values)  1
maxHeight   Sets or returns the maximum height of an element    2
maxWidth    Sets or returns the maximum width of an element 2
minHeight   Sets or returns the minimum height of an element    2
minWidth    Sets or returns the minimum width of an element 2
navDown Sets or returns where to navigate when using the arrow-down navigation key  3
navIndex    Sets or returns the tabbing order for an element    3
navLeft Sets or returns where to navigate when using the arrow-left navigation key  3
navRight    Sets or returns where to navigate when using the arrow-right navigation key 3
navUp   Sets or returns where to navigate when using the arrow-up navigation key    3
opacity Sets or returns the opacity level for an element    3
outline Sets or returns all the outline properties in one declaration   2
outlineColor    Sets or returns the color of the outline around a element   2
outlineOffset   Offsets an outline, and draws it beyond the border edge 3
outlineStyle    Sets or returns the style of the outline around an element  2
outlineWidth    Sets or returns the width of the outline around an element  2
overflow    Sets or returns what to do with content that renders outside the element box    2
padding Sets or returns the padding of an element (can have up to four values)  1
resize  Sets or returns whether or not an element is resizable by the user  3
tableLayout Sets or returns the way to lay out table cells, rows, and columns   2
tabSize Sets or returns the length of the tab-character 3
textAlignLast   Sets or returns how the last line of a block or a line right before a forced line break is aligned when text-align is "justify" 3
textDecoration  Sets or returns the decoration of a text    1
textDecorationColor Sets or returns the color of the text-decoration    3
textDecorationLine  Sets or returns the type of line in a text-decoration   3
textDecorationStyle Sets or returns the style of the line in a text decoration  3
textIndent  Sets or returns the indentation of the first line of text   1
textJustify Sets or returns the justification method used when text-align is "justify"  3
textOverflow    Sets or returns what should happen when text overflows the containing element   3
textShadow  Sets or returns the shadow effect of a text 3
textTransform   Sets or returns the capitalization of a text    1
transform   Applies a 2D or 3D transformation to an element 3
transformOrigin Sets or returns the position of transformed elements    3
transformStyle  Sets or returns how nested elements are rendered in 3D space    3
transition  A shorthand property for setting or returning the four transition properties    3
transitionProperty  Sets or returns the CSS property that the transition effect is for  3
transitionDuration  Sets or returns how many seconds or milliseconds a transition effect takes to complete  3
transitionTimingFunction    Sets or returns the speed curve of the transition effect    3
transitionDelay Sets or returns when the transition effect will start   3
visibility  Sets or returns whether an element should be visible    2
whiteSpace  Sets or returns how to handle tabs, line breaks and whitespace in a text    1
wordBreak   Sets or returns line breaking rules for non-CJK scripts 3
wordSpacing Sets or returns the spacing between words in a text 1
zIndex



https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

 */