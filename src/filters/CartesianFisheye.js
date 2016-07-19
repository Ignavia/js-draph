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
    uniform float s;
    uniform float m;
    uniform vec2  f;

    float distortDistance(float d) {
        float b = s;
        return (pow(b, d) - 1.) / (b - 1.);
    }

    float distortDirection(float f, float v) {
        float i = v < f ? 0. : 1.;
        float d = (v - f) / (i - f);
        return f + distortDistance(d) * (i - f);
    }

    vec2 distort(vec2 v) {
        return vec2(
            distortDirection(f.x, v.x),
            distortDirection(f.y, v.y)
        );
    }

    void main(void) {
        if (s == 0.) {
            gl_FragColor = texture2D(uSampler, vTextureCoord);
        } else {
            gl_FragColor = texture2D(uSampler, distort(vTextureCoord));
        }
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
            s: {
                type: "1f",
                value: 0
            },
            m: {
                type: "1f",
                value: 0.5
            },
            f: {
                type: "v2",
                value: { x: 0.5, y: 0.5 }
            }
        });
    }

    /**
     * Returns the midpoint of the distortion curve.
     *
     * @return {number}
     * The midpoint of the distortion curve.
     */
    get mp() {
        return this.uniforms.m.value;
    }

    /**
     * Sets the midpoint of the distortion curve.
     *
     * @param {number} mp
     * The midpoint of the distortion curve.
     */
    set mp(mp) {
        this.uniforms.m.value = mp;
    }

    /**
     * Returns the steepness of the distortion curve.
     *
     * @return {number}
     * The steepness of the distortion curve.
     */
    get s() {
        return this.uniforms.s.value;
    }

    /**
     * Sets the steepness of the distortion curve.
     *
     * @param {number} s
     * The steepness of the distortion curve.
     */
    set s(s) {
        this.uniforms.s.value = s;
    }

    /**
     * Returns the coordinates of the focus.
     *
     * @return {Vec2}
     * The coordinates of the focus.
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
