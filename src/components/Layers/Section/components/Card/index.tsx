import React, { useEffect, useRef } from "react";
import { PlaneDirect } from "../../../../debug/Plane";

/**
 * This is the actual card component that shows a thumbnail and adjusts the position of each mesh to fit into the grid
 * @constructor
 */

const width = 4;
const height = 4;

const Card = () => {
  const ref = useRef();

  return (
    <group ref={ref} position-x={0}>
      <PlaneDirect color={"red"} width={width} height={height} opacity={0.7}/>
    </group>
  );
};

export default Card;