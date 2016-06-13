import {GumpMap} from "@ignavia/util";

export default {
    map: new GumpMap(),
    add(path, f) {
        this.map.add(path, f);
        return this;
    },
    delete(path) {
        this.map.delete(path);
        return this;
    },
    get(path) {
        return this.map.get(path);
    },
    toFunction(param) {
        if (typeof param === "function") {
            return param;
        } else {
            return this.get(param);
        }
    },
};