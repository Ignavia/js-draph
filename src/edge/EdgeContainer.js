export default class EdgeContainer extends PIXI.Container {
    constructor(arrow, decal, line) {
        super();

        this.arrow = arrow;

        this.decal = decal;

        this.line = line;

        this.addChild(line);
        this.addChild(arrow);
        this.addChild(decal);

        console.log(this);
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