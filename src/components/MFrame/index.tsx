import React, { ForwardedRef, forwardRef, useMemo } from "react";
import type { Mesh } from "three";
import { Vector2, Color, Texture, DoubleSide } from "three";
import defaults from "./defaults";
import { backgroundFragment, backgroundVertex } from "./shaders/background";

type Props = {
  backgroundColor?: Color,
  backgroundOpacity?: number,
  borderRadius?: number,
  borderWidth?: number,
  borderColor?: Color,
  borderOpacity?: number,
  width: number,
  height: number,
  children?: React.ReactElement | React.ReactElement[]
};

type MaterialOptions = {
  texture: Texture,
  color: Color,
  opacity: number,
  backgroundMapping: number,
  borderRadius: number,
  borderWidth: number,
  borderColor: Color,
  borderOpacity: number,
  size: Vector2,
  tSize: Vector2
};

const Frame = forwardRef((props: Props, ref: ForwardedRef<Mesh>) => {
  const {
    backgroundColor,
    backgroundOpacity,
    borderRadius = defaults.borderRadius,
    borderOpacity = 1,
    borderWidth = defaults.borderWidth,
    borderColor = defaults.borderColor,
    width,
    height,
    children = null
  } = props;

  function getBackgroundUniforms(): MaterialOptions {
    const size = new Vector2(width, height);
    // texture size
    const tSize = new Vector2(1, 1);
    const texture = defaults.backgroundTexture;
    tSize.set(
      texture.image.width,
      texture.image.height,
    );

    // eslint-disable-next-line prefer-const
    const color = backgroundColor ?? defaults.backgroundColor;
    const opacity = backgroundOpacity !== undefined ? backgroundOpacity : defaults.backgroundOpacity;

    const backgroundMapping = (() => {
      switch (defaults.backgroundSize) {
        case "stretch":
          return 0;
        case "contain":
          return 1;
        case "cover":
          return 2;
        default:
          return 0;
      }
    })();

    return {
      texture,
      color,
      opacity,
      backgroundMapping,
      borderRadius,
      borderWidth,
      borderColor: borderColor ?? new Color("black"),
      borderOpacity,
      size,
      tSize,
    };
  }

  function makeBackgroundUniforms(materialOptions: MaterialOptions) {
    return {
      "u_texture": { value: materialOptions.texture },
      "u_color": { value: materialOptions.color },
      "u_opacity": { value: materialOptions.opacity },
      "u_backgroundMapping": { value: materialOptions.backgroundMapping },
      "u_borderWidth": { value: materialOptions.borderWidth },
      "u_borderColor": { value: materialOptions.borderColor },
      "u_borderRadiusTopLeft": { value: materialOptions.borderRadius },
      "u_borderRadiusTopRight": { value: materialOptions.borderRadius },
      "u_borderRadiusBottomRight": { value: materialOptions.borderRadius },
      "u_borderRadiusBottomLeft": { value: materialOptions.borderRadius },
      "u_borderOpacity": { value: materialOptions.borderOpacity },
      "u_size": { value: materialOptions.size },
      "u_tSize": { value: materialOptions.tSize },
    };
  }

  const materialOptions = getBackgroundUniforms();
  const uniforms = makeBackgroundUniforms(materialOptions);

  const shaderArgs = useMemo(() => {
    return {
      uniforms,
      vertexShader: backgroundVertex,
      fragmentShader: backgroundFragment,
    };
  }, []);

  return (
    <group>
      <mesh
        ref={ref}
        name={"Block-Frame"}
        castShadow={true}
        receiveShadow={true}
        userData={{needsRenderOrder: true}}
      >
        <planeBufferGeometry args={[width, height, 1]} />
        <shaderMaterial
          attach={"material"}
          clipping={true}
          extensions={{
            derivatives: true,
            drawBuffers: false,
            shaderTextureLOD: false,
            fragDepth: false
          }}
          args={[shaderArgs]}
          uniforms-u_texture-value={materialOptions.texture}
          uniforms-u_color-value={[materialOptions.color.r, materialOptions.color.g, materialOptions.color.b]}
          uniforms-u_opacity-value={materialOptions.opacity}
          uniforms-u_backgroundMapping-value={materialOptions.backgroundMapping}
          uniforms-u_borderWidth-value={materialOptions.borderWidth}
          uniforms-u_borderColor-value={materialOptions.borderColor}
          uniforms-u_borderRadiusTopLeft-value={materialOptions.borderRadius}
          uniforms-u_borderRadiusTopRight-value={materialOptions.borderRadius}
          uniforms-u_borderRadiusBottomRight-value={materialOptions.borderRadius}
          uniforms-u_borderRadiusBottomLeft-value={materialOptions.borderRadius}
          uniforms-u_borderOpacity-value={materialOptions.borderOpacity}
          uniforms-u_size-value={materialOptions.size}
          uniforms-u_tSize-value={materialOptions.tSize}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
      {children}
    </group>
  );
});

export default Frame;