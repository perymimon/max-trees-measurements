uniform float time;
uniform vec3 topColor;
uniform vec3 bottomColor;

varying vec2 v_uv;
varying vec4 v_modelPosition;
varying vec3 v_position;

void main() {
    // position coordinates run from -0.5 to 0.5
    vec3 color = mix(bottomColor, topColor, step(0.5,v_position.y + 0.5));
//    vec3 color = mix(bottomColor, topColor, v_position.y + 0.5);
    gl_FragColor.rgba = vec4(color, 1.0);
}