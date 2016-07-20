import {Vec2} from "@ignavia/ella";

/**
 * The source of the vertex shader.
 *
 * @type {string}
 * @ignore
 */
const vertexSrc = `
    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;
    attribute vec4 aColor;

    uniform mat3 projectionMatrix;
    uniform float midpoint;
    uniform float steepness;
    uniform vec2  focus;

    varying vec2 vTextureCoord;
    varying vec4 vColor;

    float logistic(float distance) {
        return 1. / (1. + exp(steepness * (midpoint - distance)));
    }

    float computeScalingFactor(vec2 v) {
        float distance = 0.2;//length(v - focus); // might have to divide by 2sqrt(2) or something
        return (logistic(distance) - logistic(1.)) / (logistic(0.) - logistic(1.));
    }

    void main(void) {
        float factor = computeScalingFactor(aVertexPosition);

        vec2 newPos = (aVertexPosition - vec2(0.5,0.5)) * 0.8 + vec2(0.5,0.5);

        vec2 clipPos  = (projectionMatrix * vec3(aVertexPosition, 1.0)).xy;
        gl_Position   = vec4(clipPos, 0.0, 1.0);
        vTextureCoord = (aTextureCoord - vec2(0.1, 0.)) * 1.1 + vec2(.1, 0.);
        vColor        = vec4(aColor.rgb * aColor.a, aColor.a);
    }
`;

/**
 * The source of the fragment shader.
 *
 * @type {string}
 * @ignore
 */
const fragmentSrc = `
    precision mediump float;

    uniform sampler2D uSampler;

    varying vec2 vTextureCoord;
    varying vec4 vColor;

    void main(void) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
`;

/**
 * A scaling filter.
 */
export default class Scaling extends PIXI.AbstractFilter {

    /**
     *
     */
    constructor() {
        super(vertexSrc, fragmentSrc, {
            midpoint: {
                type: "1f",
                value: 0.2
            },
            steepness: {
                type: "1f",
                value: 20
            },
            focus: {
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

export const instance = new Scaling();
