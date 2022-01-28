import React, { useMemo } from "react";
import { CustomBlending, OneMinusDstColorFactor, DstAlphaFactor, ReverseSubtractEquation, MathUtils } from "three";

const GridLines = () => {
  const processedPositions = useMemo(() => {
    const gridSizeX = 300;
    const gridSizeZ = 300;
    const gridUnit = 1;
    const newVerts = new Float32Array((gridSizeX + 1) * 2 * 4 * 3);
    let newVertexPos = 0;

    // no middle points, just bottom and top
    for (let x = 0; x <= gridSizeX; x += gridUnit) {
      for (let z = 0; z <= gridSizeZ; z += gridSizeZ) {
        newVerts[newVertexPos++] = x;
        newVerts[newVertexPos++] = -0.01;
        newVerts[newVertexPos++] = z;
      }
    }

    for (let z = 0; z <= gridSizeZ; z += gridUnit) {
      for (let x = 0; x <= gridSizeX; x += gridSizeX) {
        newVerts[newVertexPos++] = x;
        newVerts[newVertexPos++] = -0.01;
        newVerts[newVertexPos++] = z;
      }
    }

    return newVerts;
  }, []);

  return (
    <>
      <lineSegments position={[-30, 30, 0.01]} rotation={[MathUtils.degToRad(90), 0, 0]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={processedPositions.length / 3}
            array={processedPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#C8C8C8"
          // color="rgb(180, 180, 180)"
          blending={CustomBlending}
          blendEquation={ReverseSubtractEquation}
          blendSrc={OneMinusDstColorFactor}
          blendDst={DstAlphaFactor}
        />
      </lineSegments>
    </>
  );
};

const GridLines1 = () => {
  return (
    // size, divisions, colorCenterLine, colorGrid Math.PI / 6
    <gridHelper args={[600, 600, "rgb(180, 180, 180)", "rgb(180, 180, 180)"]} rotation={[MathUtils.degToRad(90), 0, 0]}/>
  );
};

export default GridLines;
export { GridLines1 };
