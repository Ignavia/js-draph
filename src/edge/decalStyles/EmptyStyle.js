import DecalStyle from "./DecalStyle.js";

export default class EmptyStyle extends DecalStyle {
    constructor() {
        super();
    }

    makeDisplayObject() {
        return new PIXI.DisplayObject();
    }
}
