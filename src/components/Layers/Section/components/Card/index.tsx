import React, { Suspense, useRef, useState } from "react";
import { PlaneDirect } from "../../../../debug/Plane";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { Sphere } from "../../../../debug/Sphere";
import { BillBoard } from "../../../../debug/BillBoard";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import { Frustum, Group, Material, Matrix4, Mesh, Vector3 } from "three";

/**
 * This is the actual card component that shows a thumbnail and adjusts the position of each mesh to fit into the grid
 * @constructor
 */

const width = 4;
const height = 4;

type Props = {
  card: {
    id: number,
    name: string,
    pos: number[],
    color: string,
    url: string,
  },
  onContextMenu?: (e: ThreeEvent<MouseEvent>, id: number) => void
};

const f = new Frustum();
const m = new Matrix4();
const v = new Vector3();

const Card = (props: Props) => {
  const {
    card,
    onContextMenu = () => {}
  } = props;
  const ref = useRef<Group>();

  const { z } = useSpring({
    from: {
      z: 2,
    },
    to: async (next) => {
      await next({ z: 2.2 });
      await next({ z: 2 });
    },
    loop: true,
    config: {
      duration: 1500,
    },
  });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const planeRef = useRef<any>();
  const sphereRef = useRef<Mesh>();

  useSpring({
    to: { opacity: hovered ? 1 : 0.5 },
    onChange: (e) => {
      if (planeRef.current && planeRef.current instanceof Mesh) {
        planeRef.current.material.opacity = e.value.opacity;
      }
    },
  });

  useSpring({
    to: { opacity: hovered ? 1 : 0.8 },
    onChange: (e) => {
      if (sphereRef.current) {
        const materials = sphereRef.current.material;
        if(materials instanceof Material) {
          materials.opacity = e.value.opacity;
        }
      }
    },
  });

  useSpring({
    to: { scale: visible ? 1 : 0 },
    onChange: (e) => {
      if (sphereRef.current) {
        sphereRef.current.scale.set(e.value.scale, e.value.scale, e.value.scale);
      }
      if (planeRef.current && planeRef.current instanceof Mesh) {
        planeRef.current.material.opacity = e.value.scale;
      }
    },
  });

  useFrame(({camera}) => {
    if(!ref.current) {
      return;
    }
    // if the element is not in the camera frustum, don't render it
    f.setFromProjectionMatrix(m.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    v.setFromMatrixPosition(ref.current.matrixWorld);
    // ref.current.visible = f.containsPoint(v);
    const nextVisibility = f.containsPoint(v);
    if(visible !== nextVisibility) {
      setVisible(nextVisibility);
    }
  });


  return (
    <group
      ref={ref}
      onContextMenu={(e) => onContextMenu(e, card.id)}
      position={[card.pos[0], card.pos[1], 0.01]}
      onPointerLeave={() => setHovered(false)}
      onPointerEnter={() => setHovered(true)}
    >
      <PlaneDirect color={card.color} width={width} height={height} opacity={0.5} ref={planeRef} />
      <a.group position-x={-0.5} position-y={-0.5} position-z={z}>
        <BillBoard>
          <Suspense fallback={null}>
            <Sphere
              ref={sphereRef}
              opacity={0.8}
              radius={2}
              textureUrl={card.url} />
          </Suspense>
        </BillBoard>
      </a.group>
    </group>
  );
};

export default Card;