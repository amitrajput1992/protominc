import React, { useRef } from "react";
import { vertexShader, fragmentShader } from "../../../shaders/background";
import { useStore } from "../../../state/store";

const shaderArgs = {
  uniforms: {},
  vertexShader,
  fragmentShader,
};

const BGScene = () => {
  return (
    <mesh ref={useStore.getState().updateBackgroundRef}>
      <planeBufferGeometry attach="geometry" args={[60, 60, 2, 2]} />
      {/*<shaderMaterial
        attach={"material"}
        args={[shaderArgs]}
      />*/}
      <meshBasicMaterial
        attach={"material"}
        color={"#EBEBEB"}
      />
    </mesh>
  );
};

export default BGScene;