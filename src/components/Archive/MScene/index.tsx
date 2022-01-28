import React, { useRef } from "react";
import { GridLines1 } from "../GridLines";
import { MathUtils } from "three";
import { PlaneDirect } from "../../debug/Plane";

const MScene = () => {
  const mainSceneRef = useRef();

  return (
    <group ref={mainSceneRef}>
      <GridLines1 />
      <fog
        attach="fog"
        args={["#FAFFFF", 5, 28]}
      />
      {/*  */}
      <group rotation={[MathUtils.degToRad(0), 0, 0]} position={[0, 0, 1]}>
        <PlaneDirect color={"red"} width={3} height={2}/>
      </group>
    </group>
  );
}

export default MScene;