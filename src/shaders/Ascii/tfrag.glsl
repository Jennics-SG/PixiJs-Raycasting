#version 300 es
precision highp float;

// In from vertex
in vec2 vTextureCoord;

// Out for renderer
out vec4 finalColor;

// Passed from PIXI
uniform sampler2D uTexture;
uniform vec4 uInputSize;

// Passed by custom filter
uniform float uTime;
uniform vec2 uMousePosition;

void main() {
    // Test each uniform individually
    vec3 color = vec3(0.0);
    
    // Test uTime - should pulse red
    color.r = (sin(uTime * 2.0) + 1.0) * 0.5;
    
    // Test uMousePosition - should be green where mouse is
    color.g = uMousePosition.x;
    color.b = uMousePosition.y;
    
    // If uniforms aren't working, you'll see only the red pulsing
    // If mouse uniform works, you'll see green/blue changes as you move mouse
    
    finalColor = vec4(color, 1.0);
}