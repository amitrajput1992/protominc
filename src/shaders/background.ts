const vertexShader = `
  precision highp float;
  #define GLSLIFY 1
  
  varying vec2 vUv; 
  void main() {
    vUv = uv; 
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
  }
`;

const fragmentShader = `
  precision highp float;
  #define GLSLIFY 1
  
  vec4 color1 = vec4(0.9725, 0.9333, 0.8667, 1.0);
  vec4 color2 = vec4(0.92, 0.92, 1., 1.);
  vec4 color3 = vec4(1., 0.97, 0.92, 1.);
  vec4 color4 = vec4(1.0, 0.9216, 0.9725, 1.0);
  
  float step1 = 0.31;
  float step2 = 0.45;
  float step3 = 0.68;
  float step4 = 0.1;
  
  varying vec2 vUv;
  
  void main() {
    gl_FragColor = color1;
    gl_FragColor = mix(gl_FragColor, color2, smoothstep(step1, step2, vUv.x));
    gl_FragColor = mix(gl_FragColor, color3, smoothstep(step2, step3, vUv.x));
    gl_FragColor = mix(gl_FragColor, color4, smoothstep(step1, step4, vUv.x));
  
    gl_FragColor.g -= smoothstep(0.3, 0.7, vUv.y) / 10.;
    gl_FragColor.r += smoothstep(0.5, 0.7, vUv.y) / 5.;
  }
`;

export {
  vertexShader,
  fragmentShader
};