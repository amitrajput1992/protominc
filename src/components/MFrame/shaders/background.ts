export const backgroundVertex = `
	varying vec2 vUv;

	#include <clipping_planes_pars_vertex>

	void main() {

		vUv = uv;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;

		#include <clipping_planes_vertex>

	}
`;

export const backgroundFragment = `
	uniform sampler2D u_texture;
  uniform vec3 u_color;
  uniform float u_opacity;
  uniform float u_borderRadiusTopLeft;
  uniform float u_borderRadiusTopRight;
  uniform float u_borderRadiusBottomLeft;
  uniform float u_borderRadiusBottomRight;
  uniform float u_borderWidth;
  uniform vec3 u_borderColor;
  uniform float u_borderOpacity;
  uniform vec2 u_size;
  uniform vec2 u_tSize;
  uniform int u_backgroundMapping;

  varying vec2 vUv;

  #include <clipping_planes_pars_fragment>
  float getEdgeDist() {
    vec2 ndc = vec2( vUv.x * 2.0 - 1.0, vUv.y * 2.0 - 1.0 );
    vec2 planeSpaceCoord = vec2( u_size.x * 0.5 * ndc.x, u_size.y * 0.5 * ndc.y );
    vec2 corner = u_size * 0.5;
    vec2 offsetCorner = corner - abs( planeSpaceCoord );
    float innerRadDist = min( offsetCorner.x, offsetCorner.y ) * -1.0;
    if (vUv.x < 0.5 && vUv.y >= 0.5) {
      float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusTopLeft, 0.0 ) ) - u_borderRadiusTopLeft;
      float s = step( innerRadDist * -1.0, u_borderRadiusTopLeft );
      return mix( innerRadDist, roundedDist, s );
    }
    if (vUv.x >= 0.5 && vUv.y >= 0.5) {
      float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusTopRight, 0.0 ) ) - u_borderRadiusTopRight;
      float s = step( innerRadDist * -1.0, u_borderRadiusTopRight );
      return mix( innerRadDist, roundedDist, s );
    }
    if (vUv.x >= 0.5 && vUv.y < 0.5) {
      float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusBottomRight, 0.0 ) ) - u_borderRadiusBottomRight;
      float s = step( innerRadDist * -1.0, u_borderRadiusBottomRight );
      return mix( innerRadDist, roundedDist, s );
    }
    if (vUv.x < 0.5 && vUv.y < 0.5) {
      float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusBottomLeft, 0.0 ) ) - u_borderRadiusBottomLeft;
      float s = step( innerRadDist * -1.0, u_borderRadiusBottomLeft );
      return mix( innerRadDist, roundedDist, s );
    }
  }
  vec4 sampleTexture() {
    float textureRatio = u_tSize.x / u_tSize.y;
    float panelRatio = u_size.x / u_size.y;
    vec2 uv = vUv;
    if ( u_backgroundMapping == 1 ) { // contain
      if ( textureRatio < panelRatio ) { // repeat on X
        float newX = uv.x * ( panelRatio / textureRatio );
        newX += 0.5 - 0.5 * ( panelRatio / textureRatio );
        uv.x = newX;
      } else { // repeat on Y
        float newY = uv.y * ( textureRatio / panelRatio );
        newY += 0.5 - 0.5 * ( textureRatio / panelRatio );
        uv.y = newY;
      }
    } else if ( u_backgroundMapping == 2 ) { // cover
      if ( textureRatio < panelRatio ) { // stretch on Y
        float newY = uv.y * ( textureRatio / panelRatio );
        newY += 0.5 - 0.5 * ( textureRatio / panelRatio );
        uv.y = newY;
      } else { // stretch on X
        float newX = uv.x * ( panelRatio / textureRatio );
        newX += 0.5 - 0.5 * ( panelRatio / textureRatio );
        uv.x = newX;
      }
    }
    return texture2D( u_texture, uv ).rgba;
  }

  void main() {
    float edgeDist = getEdgeDist();
    float change = fwidth( edgeDist );

    vec4 textureSample = sampleTexture();
    vec3 blendedColor = textureSample.rgb * u_color;
    
    float alpha = smoothstep( change, 0.0, edgeDist );
    float blendedOpacity = u_opacity * textureSample.a * alpha;
    
    vec4 borderColor = vec4( u_borderColor, u_borderOpacity * alpha );
    vec4 frameColor = vec4( blendedColor, blendedOpacity );
    float stp = smoothstep( edgeDist + change, edgeDist, u_borderWidth * -1.0 );
    gl_FragColor = mix( frameColor, borderColor, stp );
    
    #include <clipping_planes_fragment>
  }
`;