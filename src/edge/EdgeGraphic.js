/**
 * Bundles arrow, decal and line sprite into a single display object.
 */
export default class EdgeGraphic extends PIXI.Container {

    /**
     * @param {DisplayObject} arrow
     * The arrow sprite.
     *
     * @param {DisplayObject} decal
     * The decal sprite.
     *
     * @param {DisplayObject} line
     * The line sprite.
     */
    constructor(arrow, decal, line) {
        super();

        /**
         * The arrow sprite.
         *
         * @type {DisplayObject}
         * @private
         */
        this.arrow = arrow;

        /**
         * The decal sprite.
         *
         * @type {DisplayObject}
         * @private
         */
        this.decal = decal;

        /**
         * The line sprite.
         *
         * @type {DisplayObject}
         * @private
         */
        this.line = line;

        // Add sprites to container
        this.addChild(line);
        this.addChild(arrow);
        this.addChild(decal);
    }

    /**
     * Returns the arrow sprite.
     *
     * @return {DisplayObject}
     * The arrow sprite.
     */
    getArrow() {
        return this.arrow;
    }

    /**
     * Returns the decal sprite.
     *
     * @return {DisplayObject}
     * The decal sprite.
     */
    getDecal() {
        return this.decal;
    }

    /**
     * Returns the line sprite.
     *
     * @return {DisplayObject}
     * The line sprite.
     */
    getLine() {
        return this.line;
    }
}