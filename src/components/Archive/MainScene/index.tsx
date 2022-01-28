import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import GridLines, { GridLines1 } from "../GridLines";
import { PlaneDirect } from "../../debug/Plane";
import { MathUtils } from "three";

const MainScene = () => {
  const mainSceneRef = useRef();
  const { gl, size, camera } = useThree();

  useEffect(() => {
    gl.autoClear = false;
    gl.setScissorTest(true);
  }, [gl]);

  useFrame(({ gl }) => {
    gl.setScissor(0, 0, size.width, size.height);
    if(mainSceneRef.current) {
      gl.render(mainSceneRef.current, camera);
    }
  }, 11);

  return (
    <scene ref={mainSceneRef}>
      <GridLines1 />
      {/* This mesh occludes items that pass through the 'floor' */}
      <mesh rotation={[0, 0, 0]} position={[-6, -0.02, -6]}>
        <planeBufferGeometry attach="geometry" args={[60, 60, 2, 2]} />
        <meshBasicMaterial attach="material" color="white" colorWrite={false} />
      </mesh>
      <fog
        attach="fog"
        args={["#FAFFFF", 5, 28]}
      />
    {/* children */}
      <group rotation={[MathUtils.degToRad(90), 0, 0]} position={[-1.5, 0, -1]}>
        <PlaneDirect color={"red"} width={3} height={2}/>
      </group>
    </scene>
  );
}

export default MainScene;
