#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uSize;
uniform vec4 uInputSize;
uniform float uTime;

vec2 mapCoord(vec2 coord) {
    coord *= uInputSize.xy; // scale to pixel space
    coord += uInputSize.zw; // apply offset
    return coord;
}

vec2 unmapCoord(vec2 coord) {
    coord -= uInputSize.zw; // remove offset
    coord /= uInputSize.xy; // normalize back
    return coord;
}

vec2 pixelate(vec2 coord, vec2 size) {
    return floor(coord / size) * size;
}

vec2 getMod(vec2 coord, vec2 size) {
    return mod(coord, size) / size;
}

float character(float n, vec2 p) {
    p = floor(p * vec2(4.0, 4.0) + 2.5);

    if (clamp(p.x, 0.0, 4.0) == p.x) {
        if (clamp(p.y, 0.0, 4.0) == p.y) {
            if (int(mod(n / exp2(p.x + 5.0 * p.y), 2.0)) == 1) return 1.0;
        }
    }
    return 0.0;
}

void main() {
    vec2 coord = mapCoord(vTextureCoord);

    // Mix lerps between sizes

    float oscilatingSize = mix(50., 200., abs(sin(uTime)));

    // Align to grid
    vec2 pixCoord = pixelate(coord, vec2(oscilatingSize));
    pixCoord = unmapCoord(pixCoord);

    // Sample texture
    vec4 color = texture(uTexture, pixCoord);

    // Brightness
    float gray = (0.3 * color.r + 0.59 * color.g + 0.11 * color.b) * 1.5;
    gray = clamp(gray, 0., 1.);

    // ASCII bit patterns
    float n =  65536.0;             // '.'
    if (gray > 0.2) n = 65600.0;    // ':'
    if (gray > 0.3) n = 332772.0;   // '*'
    if (gray > 0.4) n = 15255086.0; // 'o'
    if (gray > 0.5) n = 23385164.0; // '&'
    if (gray > 0.6) n = 15252014.0; // '8'
    if (gray > 0.7) n = 13199452.0; // '@'
    if (gray > 0.8) n = 11512810.0; // '#'

    // Cell position
    vec2 modd = getMod(coord, vec2(oscilatingSize));

    // Output
    finalColor = color * character(n, vec2(-1.0) + modd * 2.0);
}
