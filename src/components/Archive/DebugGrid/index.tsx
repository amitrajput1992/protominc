import React from "react";

const DebugGrid = () => {
  return (
    <group>
      <gridHelper args={[30, 30, "#FFF", "#060606"]} />
      <gridHelper args={[30, 6, "#FFF", "#17141F"]} />
    </group>
  );
};

export default DebugGrid;