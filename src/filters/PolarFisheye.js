import {Vec2} from "@ignavia/ella";

/**
 * The source of the fragment shader.
 *
 * @type {string}
 * @ignore
 */
const fragmentSrc = `
    precision mediump float;

    uniform sampler2D uSampler;
    uniform float base;
    uniform float radius;
    uniform vec2  focus;

    varying vec2 vTextureCoord;
    varying vec4 vColor;

    float distortDistance(float distance) {
        return (pow(base, distance) - 1.) / (base - 1.);
    }

    vec2 distort(vec2 v) {
        vec2 connector = v - focus;
        float length   = length(connector);
        if (length >= radius || length == 0.) {
            return v;
        } else {
            return focus + distortDistance(length / radius) * (connector / length * radius);
        }
    }

    void main(void) {
        gl_FragColor = texture2D(uSampler, distort(vTextureCoord));
    }
`;

/**
 * A polar fisheye filter.
 */
export default class PolarFisheye extends PIXI.Filter {

    /**
     *
     */
    constructor() {
        super(null, fragmentSrc, {
            base: {
                type: "1f",
                value: 2
            },
            radius: {
                type: "1f",
                value: 1,
            },
            focus: {
                type: "v2",
                value: { x: 0.5, y: 0.5 }
            },
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
        const base = this.uniforms.base.value;
        return 1 / (base**0.5 + 1);
    }

    /**
     * Sets the value of the distortion function at x = 0.5. This is the
     * place halfway between the focus point and the border.
     *
     * @param {number} y
     * The value of the distortion function at x = 0.5.
     */
    set centerHeight(y) {
        this.uniforms.base.value = (1 / y - 1)**2;
    }

    /**
     * Returns the radius of the effect.
     *
     * @return {number}
     * The radius of the effect.
     */
    get radius() {
        return this.uniforms.radius.value;
    }

    /**
     * Sets the radius of the effect.
     *
     * @param {number} radius
     * The radius of the effect.
     */
    set radius(radius) {
        this.uniforms.radius.value = radius;
    }

    /**
     * Returns the coordinates of the focus.
     *
     * @return {Vec2}
     * The coordinates of the focus.
     */
    get focus() {
        return new Vec2(
            this.uniforms.focus.value.x,
            this.uniforms.focus.value.y
        );
    }

    /**
     * Sets the coordinates of the focus.
     *
     * @param {Vec2} focus
     * The coordinates of the focus.
     */
    set focus(focus) {
        this.uniforms.focus.value = focus;
    }
}

export const instance = new PolarFisheye();
