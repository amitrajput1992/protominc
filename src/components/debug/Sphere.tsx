import React from "react";
import { ClampToEdgeWrapping, DoubleSide, LinearFilter, Mesh, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

type Props = {
  radius?: number,
  phiLength?: number,
  wireframe?: boolean,
  opacity?: number,
  textureUrl?: string
}

export const Sphere = React.forwardRef((props: Props, ref: React.ForwardedRef<Mesh | undefined>) => {
  const {
    opacity = 1,
    radius = 1,
    textureUrl = ""
  } = props;
  const texture = useLoader(TextureLoader, textureUrl);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;

  return (
    <mesh ref={ref}>
      {/* radius: 1, widthSegments: 32, heightSegments: 32, phiStart: 0, phiLength: 360, thetaStart: 0, thetaLength: 180 */}
      <sphereBufferGeometry attach="geometry" args={[radius, 60, 40]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
        opacity={opacity}
        transparent={opacity < 1}
      />
    </mesh>
  );
});