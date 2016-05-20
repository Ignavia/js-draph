import $ from "jquery";

export const addBehavior = function (stage, renderer) {
    $(renderer.view).mousedown((e) => {
        stage.lastPos = {x: e.offsetX, y: e.offsetY};
    }).mouseup((e) => {
        stage.lastPos = undefined;
    }).mousemove((e) => {
        if (stage.lastPos) {
            stage.x += e.offsetX - stage.lastPos.x;
            stage.y += e.offsetY - stage.lastPos.y;
            stage.lastPos = {x: e.offsetX, y: e.offsetY};
        }
    }).mouseleave((e) => {
        stage.lastPos = undefined;
    });
};
