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
    uniform float b;
    uniform float r;
    uniform vec2  f;

    float distortDistance(float d) {
        return (pow(b, d) - 1.) / (b - 1.);
    }

    vec2 distort(vec2 v) {
        vec2 connector = v - f;
        float l        = length(connector);
        if (l >= r || l == 0.) {
            return v;
        } else {
            float d = l / r;
            return f + distortDistance(d) * (connector / l * r);
        }
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
            b: {
                type: "1f",
                value: 2
            },
            r: {
                type: "1f",
                value: 0.5,
            },
            f: {
                type: "v2",
                value: { x: 0.5, y: 0.5 }
            }
        });
    }

    /**
     * Returns the value of the distortion function at x = 0.5. This is the
     * place halfway between the focus point and the border.
     *
     * @return {number}
     * The value of the distortion function at x = 0.5.
     */
    get centerHeight() {
        const b = this.uniforms.b.value;
        return 1 / (b**0.5 + 1);
    }

    /**
     * Sets the value of the distortion function at x = 0.5. This is the
     * place halfway between the focus point and the border.
     *
     * @param {number} y
     * The value of the distortion function at x = 0.5.
     */
    set centerHeight(y) {
        this.uniforms.b.value = (1 / y - 1)**2;
    }

    /**
     * Returns the radius of the effect.
     *
     * @return {number}
     * The radius of the effect.
     */
    get radius() {
        return this.uniforms.r.value;
    }

    /**
     * Sets the radius of the effect.
     *
     * @param {number} r
     * The radius of the effect.
     */
    set radius(r){
        this.uniforms.r.value = r;
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
