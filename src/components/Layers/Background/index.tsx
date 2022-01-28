import React from "react";
import { vertexShader, fragmentShader } from "../../../shaders/background";
import { useStore } from "../../../state/store";
import { useContextMenu } from "react-contexify";
import { backgroundContextMenuId } from "../../ContextMenu/BackgroundContextMenu";
import { ThreeEvent } from "@react-three/fiber";

const shaderArgs = {
  uniforms: {},
  vertexShader,
  fragmentShader,
};

const BGScene = () => {
  const { show } = useContextMenu({
    id: backgroundContextMenuId
  });

  function onContextMenu(e: ThreeEvent<MouseEvent>) {
    const backgroundMeshRef = useStore.getState().backgroundRef;
    e.stopPropagation();
    const point = e.point;
    backgroundMeshRef.worldToLocal(point);

    show(e as any, {
      props: {
        x: Math.round(point.x),
        y: Math.round(point.y)
      }
    });
  }

  return (
    <mesh ref={useStore.getState().updateBackgroundRef} onContextMenu={onContextMenu}>
      <planeBufferGeometry attach="geometry" args={[100, 100, 2, 2]} />
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