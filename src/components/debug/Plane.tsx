import { DoubleSide } from "three";
import React from "react";

interface Props {
  width?: number,
  height?: number,
  color?: string,
  opacity?: number,
  wireframe?: boolean,
  position?: any,
  map?: any,
}

export const PlaneDirect = React.forwardRef((props: Props, ref: any) => {
  const {position = [0, 0, 0], width = 1, height = 1, color = "#FFF", opacity = 1, wireframe = false, map = ""} = props;

  return (
    <mesh renderOrder={999} position={position} ref={ref}>
      {/* args = [width, height, widthSegments, heightSegments] */}
      <planeBufferGeometry args={[width, height, 1]}/>
      <meshBasicMaterial
        wireframe={wireframe}
        attach="material"
        side={DoubleSide}
        opacity={opacity}
        transparent={true}
        visible={true}
        color={color}
        map={map}
      />
    </mesh>
  )
});