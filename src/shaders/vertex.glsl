#version 300 es
precision mediump float;

in vec2 aVertexPosition;
in vec2 aTextureCoord;

uniform mat3 projectionMatrix;

out vec2 vTextureCoord;

void main(void) {
    vTextureCoord = aTextureCoord;
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition.x + 1, aVertexPosition.y + 2, 1.0)).xy, 0.0, 1.0);
}
