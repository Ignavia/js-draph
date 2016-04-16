import Style    from "./Style.js";
import Behavior from "./Behavior.js";

export default class Visualizer {
    constructor() {
        this.style = new Style();
        this.behavior = new Behavior();
    }
}
