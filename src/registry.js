import {GumpMap} from "@ignavia/util";

/**
 * Stores style and behavior functions.
 */
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

    /**
     * Adds the function to the registry under the given path.
     *
     * @param {GumpPath} path
     * The path to the function.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    add(path, f) {
        this.map.add(path, f);
        return this;
    }

    /**
     * Adds an arrow style to the registry.
     *
     * @param {String} name
     * The name to register.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    addEdgeArrowStyle(name, f) {
        return this.add(["edge", "arrowStyle", name], f);
    }

    /**
     * Adds an edge behavior to the registry.
     *
     * @param {String} name
     * The name to register.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    addEdgeBehavior(name, f) {
        return this.add(["edge", "behavior", name], f);
    }

    /**
     * Adds a decal style to the registry.
     *
     * @param {String} name
     * The name to register.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    addEdgeDecalStyle(name, f) {
        return this.add(["edge", "decalStyle", name], f);
    }

    /**
     * Adds a line style to the registry.
     *
     * @param {String} name
     * The name to register.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    addEdgeLineStyle(name, f) {
        return this.add(["edge", "lineStyle", name], f);
    }

    /**
     * Adds a graph behavior to the registry.
     *
     * @param {String} name
     * The name to register.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    addGraphBehavior(name, f) {
        return this.add(["graph", "behavior", name], f);
    }

    /**
     * Adds a graph style to the registry.
     *
     * @param {String} name
     * The name to register.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    addGraphStyle(name, f) {
        return this.add(["graph", "style", name], f);
    }

    /**
     * Adds a node behavior to the registry.
     *
     * @param {String} name
     * The name to register.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    addNodeBehavior(name, f) {
        return this.add(["node", "behavior", name], f);
    }

    /**
     * Adds a node style to the registry.
     *
     * @param {String} name
     * The name to register.
     *
     * @param {Function} f
     * The function to add.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    addNodeStyle(name, f) {
        return this.add(["node", "style", name], f);
    }

    /**
     * Removes the function stored under the given path.
     *
     * @param {GumpPath} path
     * The path to the function.
     *
     * @return {Registry}
     * This object to make the method chainable.
     */
    delete(path) {
        this.map.delete(path);
        return this;
    }

    /**
     * Returns the function stored under the given path.
     *
     * @param {GumpPath} path
     * The path to the function.
     *
     * @return {Function}
     * The functions listed under the given path.
     */
    get(path) {
        return [...this.map.get(path)][0];
    }
};

export default new Registry();