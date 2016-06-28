export default class EdgeContainer extends PIXI.Container() {
    constructor(arrow, decal, line) {
        super();

        this.addChild(line);
        this.addChild(arrow);
        this.addChild(decal);
    }

    getArrow() {
        return this.arrow;
    }

    getDecal() {
        return this.decal;
    }

    getLine() {
        return this.line;
    }
}