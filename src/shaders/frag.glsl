precision mediump float;

uniform sampler2D baseColourTexture;

varying vec2 vTextureCoord;

void main() {
    vec4 baseColour = texture2D(baseColourTexture, vTextureCoord);
    vec3 invertColour = vec3(1.0 - baseColour.rgb);
    gl_FragColor = vec4(invertColour, baseColour.a);
}