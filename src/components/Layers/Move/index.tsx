import React, { useEffect, useRef, Suspense } from "react";
import { Group, MathUtils, Plane, Raycaster, Vector2, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useStore } from "../../../state/store";
import { cloneDeep } from "lodash-es";
import { Image } from "../../debug/Image";

/**
 * This component works at the global level.
 * A semi transparent mesh moves with the cursor over the grid in the mouse direction. We need very simple controls here
 *
 */
const v1 = new Vector3(0, 1, 0); // facing towards +ve y
/**
 * !Why this is 30 deg?
 * The background mesh's plane's normal is (0, 0, 1)
 * The intersection plane's normal is (0, 1, 0)
 *
 * Background mesh is rotated in x by 60 deg, so rotation of the intersection plane is always 90 (normal is perpendicular) - 60 = 30 deg
 */
v1.applyAxisAngle(new Vector3(1, 0, 0), MathUtils.degToRad(30));

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
      if (!move) {
        return;
      }

      if (!ref.current) {
        return;
      }

      const backgroundRef = useStore.getState().backgroundRef;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, intersects);

      // ! Convert the intersection point with plane to local coordinates on the background mesh
      backgroundRef?.worldToLocal(intersects);
      ref.current.position.x = Math.round(intersects.x);
      ref.current.position.y = Math.round(intersects.y);
    }

    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) {
        return;
      }
      if (!move) {
        return;
      }
      const contextCardId = useStore.getState().contextCardId;
      if (!contextCardId) {
        return;
      }
      const x = ref.current?.position.x;
      const y = ref.current?.position.y;

      const json = useStore.getState().json;
      const card = json.cards[contextCardId];
      if (card) {
        card.pos = [x, y];
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
      <group ref={ref} position-z={0.01}>
        <Suspense fallback={null}>
          {/*<MFrame width={4} height={4} borderWidth={0.01} borderColor={new Color("#2790FB")} borderOpacity={1} backgroundOpacity={0} borderRadius={0.05} />*/}
          {/*<PlaneDirect color={"green"} opacity={0.3} width={4} height={4}/>*/}
          <Image width={4.5} height={4.5}
                 textureUrl={"https://gm-gb-test.s3.ap-south-1.amazonaws.com/highlight3.png"} />
        </Suspense>
      </group> :
      null
  );
};

export default Move;