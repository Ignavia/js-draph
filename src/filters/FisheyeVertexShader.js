import {Vec2} from "@ignavia/ella";

const vertexSrc = `
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;
    attribute vec4 aColor;

    uniform mat3 projectionMatrix;
    uniform mat3 otherMatrix;

    varying vec2 vMapCoord;
    varying vec2 vTextureCoord;
    varying vec4 vColor;

    void main(void) {
        gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
        vMapCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
        vColor = vec4(aColor.rgb * aColor.a, aColor.a);
    }
`;

export default class extends PIXI.AbstractFilter {

    constructor() {
        super(vertexSrc, null, {
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
