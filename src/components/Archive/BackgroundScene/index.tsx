import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "../../../shaders/background";
import type {Scene} from "three";

const shaderArgs = {
  uniforms: {},
  vertexShader,
  fragmentShader,
};

function BackgroundScene() {
  const backgroundSceneRef = useRef<Scene>();

  useFrame(({ gl, size, camera }) => {
    gl.clearDepth();
    gl.setScissor(0, 0, size.width, size.height);
    if(backgroundSceneRef.current) {
      gl.render(backgroundSceneRef.current, camera);
    }
  }, 10);

  return (
    <scene ref={backgroundSceneRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7, -3, -1]}>
        <planeBufferGeometry attach="geometry" args={[60, 60, 2, 2]} />
        <shaderMaterial
          attach={"material"}
          args={[shaderArgs]}
        />
      </mesh>
      {/*<Particles />*/}
    </scene>
  );
}

export default BackgroundScene;