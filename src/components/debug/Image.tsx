import { ClampToEdgeWrapping, DoubleSide, LinearFilter, TextureLoader } from "three";
import React from "react";
import { useLoader } from "@react-three/fiber";

type Props = {
  width?: number,
  height?: number,
  color?: string,
  opacity?: number,
  wireframe?: boolean,
  map?: any,
  textureUrl?: string
}

export const Image = ({ width = 1, height = 1, opacity = 1, wireframe = false, textureUrl = "" }: Props) => {
  const texture = useLoader(TextureLoader, textureUrl);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;

  return (
    <mesh>
      {/* args = [width, height, widthSegments, heightSegments] */}
      <planeBufferGeometry attach={"geometry"} args={[width, height]}/>
      <meshBasicMaterial
        wireframe={wireframe}
        attach="material"
        side={DoubleSide}
        opacity={opacity}
        transparent={true}
        // color={"green"}
        map={texture}
      />
    </mesh>
  )
};