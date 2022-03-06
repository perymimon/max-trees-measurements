varying vec2 v_uv;
varying vec4 v_modelPosition;
varying vec3 v_position;

void main() {
//    vUv = uv;
//    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vec4 modelPosition = modelMatrix * vec4(position,1.0) ;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // output to fragment shader
    v_position = position;
    v_modelPosition = modelPosition;
    v_uv = uv;
}