import {Vec2} from "@ignavia/ella";

const fragmentSrc = `
    precision mediump float;

    varying vec2 vTextureCoord;
    varying vec4 vColor;
    uniform sampler2D uSampler;
    uniform float d;
    uniform vec2 f;

    vec2 frameIntersection(vec2 v) {
        float slope = (v.y - f.y) / (v.x - f.x);
        if (-1. <= slope && slope <= 1.) {
            if (v.x <= 0.5) { // intersects line segment from (0, 0) to (0, 1)
                return vec2(0., f.y - f.y * slope);
            } else {          // intersects line segment from (1, 0) to (1, 1)
                return vec2(1., f.y + (1. - f.y) * slope);
            }
        } else {
            if (v.y <= 0.5) { // intersects line segment from (0, 0) to (1, 0)
                return vec2(f.x - f.x / slope, 0.);
            } else {          // intersects line segment from (1, 0) to (1, 1)
                return vec2(f.y + (1. - f.x) / slope, 1.);
            }
        }
    }

    float h(float a) {
        return a / (d + 1. - a * d);
    }

    vec2 distort(vec2 v) {
        vec2 i = frameIntersection(v);
        float a = length(v - f) / length(i - f);
        return f + h(a) * (i - f);
    }

    void main(void) {
        gl_FragColor = texture2D(uSampler, distort(vTextureCoord));
    }
`;

export default class extends PIXI.AbstractFilter {

    constructor() {
        super(null, fragmentSrc, {
            d: {
                type: "1f",
                value: 0
            },
            f: {
                type: "v2",
                value: {x: 0.5, y: 0.5}
            }
        });
    }

    get p() {
        const d = this.uniforms.d.value;
        return d / (d + 1);
    }

    set p(p) {
        this.uniforms.d.value = p / (1 - p);
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