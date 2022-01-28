import React from "react";
import { ClampToEdgeWrapping, DoubleSide, LinearFilter, MathUtils, TextureLoader, Vector3 } from "three";
import { useLoader } from "@react-three/fiber"; // to use custom ts jsx components


// this is used to orient the center of the camera to the center of the pano
const DEFAULT_PANO_Y = -90;
const scaleInvertForCenterCamera = new Vector3(-1, 1, 1);

const Pano = () => {

  const texture = useLoader(TextureLoader, "https://gm-gb-test.s3.ap-south-1.amazonaws.com/gmetri-player/local/assets/classroom_001.jpg");
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;

  return (
    <mesh scale={scaleInvertForCenterCamera} rotation={[0, MathUtils.degToRad(DEFAULT_PANO_Y), 0]} name={"PanoImageR__mesh"}>
      <sphereBufferGeometry attach="geometry" args={[1000, 60, 40]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
        opacity={1}
        transparent={true}
      />
    </mesh>
  );
};

export default Pano;