import React, { useEffect, useRef } from "react";
import { PlaneDirect } from "../../debug/Plane";
import { Group, MathUtils, Plane, Raycaster, Vector2, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useStore } from "../../../state/store";
import { cloneDeep } from "lodash-es";

/**
 * This component works at the global level.
 * A semi transparent mesh moves with the cursor over the grid in the mouse direction. We need very simple controls here
 *
 */
const v1 = new Vector3(0, 1, 0); // facing towards +ve y
v1.applyAxisAngle(new Vector3(1, 0, 0), MathUtils.degToRad(45)); // rotate on x axis by 45 deg

const mouse = new Vector2();
const raycaster = new Raycaster();
const intersects = new Vector3();
const plane = new Plane(v1, 0);

const Move = () => {
  const ref = useRef<Group>();
  const camera = useThree(s => s.camera);
  const move = useStore(s => s.move);

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if(!move) {
        return;
      }

      if(!ref.current) {
        return;
      }

      const backgroundRef = useStore.getState().backgroundRef;

      mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, intersects);

      // ! Convert the intersection point with plane to local coordinates on the background mesh
      backgroundRef?.worldToLocal(intersects);
      ref.current.position.x = Math.round(intersects.x);
      ref.current.position.y = Math.round(intersects.y);
    }

    function onPointerDown(e: PointerEvent) {
      if(e.button !== 0) {
        return;
      }
      if(!move) {
        return;
      }
      const contextCardId = useStore.getState().contextCardId;
      if(!contextCardId) {
        return;
      }
      const x = ref.current?.position.x;
      const y = ref.current?.position.y;

      const json = useStore.getState().json;
      const card = json.cards[contextCardId];
      if(card) {
        card.pos = [x, y];
        console.log(json);

        useStore.getState().commit(cloneDeep(json));
        useStore.getState().setMove(false);
        useStore.getState().setContextCardId(null);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [camera, move]);

  return (
    move ?
    // bring it to the same level as the cards layer
    <group ref={ref}>
      <PlaneDirect color={"green"} opacity={0.3} width={4} height={4}/>
    </group>:
      null
  );
};

export default Move;