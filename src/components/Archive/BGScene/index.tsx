import React from "react";
import { vertexShader, fragmentShader } from "../../../shaders/background";

const shaderArgs = {
  uniforms: {},
  vertexShader,
  fragmentShader,
};

const BGScene = () => {
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[60, 60, 2, 2]} />
      <shaderMaterial
        attach={"material"}
        args={[shaderArgs]}
      />
    </mesh>
  );
};

export default BGScene;