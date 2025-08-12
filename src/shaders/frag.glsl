precision mediump float;

uniform sampler2D uTexture;
uniform float uTime;         // for animation if needed
uniform vec2 uResolution;    // texture or canvas size

varying vec2 vTextureCoord;

// Pseudo-random function (could be improved)
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vTextureCoord;

    // Amount to randomly shift pixels (in UV space)
    float maxOffset = 0.05 * abs(tan(uTime)); // oscillates 0.05–0.1

    // Generate random offset based on pixel coordinates + time for animation
    vec2 jitter = vec2(
        random(uv + uTime),
        random(uv + uTime + 1.0)
    );

    // Center jitter around zero: [-0.5, 0.5]
    jitter -= 0.5;

    // Scale jitter to max offset
    jitter *= maxOffset;

    // Offset UV by jitter
    vec2 jitteredUV = clamp(uv + jitter, 0.0, 1.0);

    // Sample the texture at jittered coords
    vec4 color = texture2D(uTexture, jitteredUV);

    gl_FragColor = color;
}
