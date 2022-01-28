import React from "react";
import { Canvas as R3FCanvas, useFrame } from "@react-three/fiber";
import MapControls from "../../controls/MapControls";
import Layers from "../Layers";
import { Vector3, MathUtils, Plane } from "three";
import DragControls from "../../controls/DragControls";
import { useStore } from "../../state/store";

const DisableRender = () => useFrame(() => null, 1000);

const v1 = new Vector3(0, 1, 0); // facing towards +ve y
v1.applyAxisAngle(new Vector3(1, 0, 0), MathUtils.degToRad(30)); // rotate on x axis by 45 deg

const Canvas = () => {
  return (
    <R3FCanvas
      orthographic={true}
      // TODO Adjust this to device's DPR
      dpr={[1, 2]}
      camera={{
        zoom: 40,
        position: [0, 0, 50],
        far: 10000,
        near: 0,
        up: [0, 0, 1],
      }}
      style={{
        pointerEvents: "all",
        position: "absolute",
        zIndex: 0,
        width: "100%",
        height: "100%"
      }}
      id="primary-canvas"
      //toggle sRGB color management.
      // linear={true}
    >
      {/*<planeHelper plane={new Plane(v1, 0)} size={100}/>*/}
      <MapControls ref={useStore.getState().updateMapControlsRef}/>
      <DragControls />
      <Layers />
    </R3FCanvas>
  );
};

export default Canvas;

// camera = 0
// background = 100
// foreground = 100