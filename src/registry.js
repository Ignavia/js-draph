import {GumpMap} from "@ignavia/util";

class Registry {

    /**
     *
     */
    constructor() {

        /**
         * Maps from paths to the actual functions.
         *
         * @type {GumpMap<GumpPath, Function>}
         *
         * @private
         */
        this.map = new GumpMap();
    }


    add(path, f) {
        this.map.add(path, f);
        return this;
    }
    addEdgeArrowStyle(name, f) {
        return this.add(["edge", "arrowStyle", name], f);
    }
    addEdgeBehavior(name, f) {
        return this.add(["edge", "behavior", name], f);
    }
    addEdgeDecalStyle(name, f) {
        return this.add(["edge", "decalStyle", name], f);
    }
    addEdgeLineStyle(name, f) {
        return this.add(["edge", "lineStyle", name], f);
    }
    addGraphBehavior(name, f) {
        return this.add(["graph", "behavior", name], f);
    }
    addGraphStyle(name, f) {
        return this.add(["graph", "style", name], f);
    }
    addNodeBehavior(name, f) {
        return this.add(["node", "behavior", name], f);
    }
    addNodeStyle(name, f) {
        return this.add(["node", "style", name], f);
    }
    delete(path) {
        this.map.delete(path);
        return this;
    }
    get(path) {
        return this.map.get(path);
    }
};

export default new Registry();