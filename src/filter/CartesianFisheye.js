import {Vec2} from "@ignavia/ella";

const fragmentSrc = `
    precision mediump float;

    varying vec2 vTextureCoord;
    varying vec4 vColor;
    uniform sampler2D uSampler;
    uniform float dx;
    uniform float dy;
    uniform vec2 f;

    float hx(float ax) {
        return ax / (dx + 1. - ax * dx);
    }

    float hy(float ay) {
        return ay / (dy + 1. - ay * dy);
    }

    vec2 distort(vec2 v) {
        float ix = v.x < f.x ? 0. : 1.;
        float iy = v.y < f.y ? 0. : 1.;
        float ax = (f.x - v.x) / (f.x - ix);
        float ay = (f.y - v.y) / (f.y - iy);
        return vec2(f.x + hx(ax) * (ix - f.x), f.y + hy(ay) * (iy - f.y));
    }

    void main(void) {
        gl_FragColor = texture2D(uSampler, distort(vTextureCoord));
    }
`;

export default class extends PIXI.AbstractFilter {

    constructor() {
        super(null, fragmentSrc, {
            dx: {
                type: "1f",
                value: 0
            },
            dy: {
                type: "1f",
                value: 0
            },
            f: {
                type: "v2",
                value: { x: 0.5, y: 0.5 }
            }
        });
    }

    get px() {
        const dx = this.uniforms.dx.value;
        return dx / (dx + 1);
    }

    set px(px) {
        this.uniforms.dx.value = px / (1 - px);
    }

    get py() {
        const dy = this.uniforms.dy.value;
        return dy / (dy + 1);
    }

    set py(py) {
        this.uniforms.dy.value = py / (1 - py);
    }

    /**
     * Returns the coordinates of the focus.
     *
     * @return {Vec2}
     */
    get focus() {
        return new Vec2(
            this.uniforms.f.value.x,
            this.uniforms.f.value.y
        );
    }

    /**
     * Sets the coordinates of the focus.
     *
     * @param {Vec2} coordinates
     * The coordinates of the focus.
     */
    set focus(coordinates) {
        this.uniforms.f.value = coordinates;
    }
}
