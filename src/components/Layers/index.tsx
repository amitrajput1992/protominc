import React from "react";
import Background from "./Background";
import Grid from "./Grid";
import Section from "./Section";
import { MathUtils } from "three";
import Move from "./Move";

const rad45 = MathUtils.degToRad(45);

const Layer = () => {
  return(
    <group>
      <group rotation-z={rad45} rotation-x={-rad45}>
        <Background />
        <Grid />
        <Section />
        <Move />
      </group>
    </group>
  );
};

export default Layer;