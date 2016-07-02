import {Vec2} from "@ignavia/ella";

/**
 * The source of the fragment shader.
 *
 * @type {string}
 * @ignore
 */
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
        float ax = (v.x - f.x) / (ix - f.x);
        float ay = (v.y - f.y) / (iy - f.y);
        return vec2(f.x + hx(ax) * (ix - f.x), f.y + hy(ay) * (iy - f.y));
    }

    void main(void) {
        gl_FragColor = texture2D(uSampler, distort(vTextureCoord));
    }
`;

/**
 * A cartesian fisheye filter.
 */
export default class extends PIXI.AbstractFilter {

    /**
     *
     */
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

    /**
     * Returns the strength of the x-distortion.
     *
     * @return {number}
     * The strength of the x-distortion.
     */
    get px() {
        const dx = this.uniforms.dx.value;
        return dx / (dx + 1);
    }

    /**
     * Sets the strength of the x-distortion.
     *
     * @param {number} px
     * The strength of the x-distortion.
     */
    set px(px) {
        this.uniforms.dx.value = px / (1 - px);
    }

    /**
     * Returns the strength of the y-distortion.
     *
     * @return {number}
     * The strength of the y-distortion.
     */
    get py() {
        const dy = this.uniforms.dy.value;
        return dy / (dy + 1);
    }

    /**
     * Sets the strength of the y-distortion.
     *
     * @param {number} py
     * The strength of the y-distortion.
     */
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
