import { useThree } from "@react-three/fiber";
import React from "react";
import { DragControls } from "./impl";
import { MathUtils, Plane, Raycaster, Vector2, Vector3 } from "three";
import { useStore } from "../../state/store";

type ControlsEvent = {
  type: string
};

type Props = {
  onChange?: (e: any) => void,
  objects?: any[],
};

const v1 = new Vector3(0, 1, 0); // facing towards +ve y
v1.applyAxisAngle(new Vector3(1, 0, 0), MathUtils.degToRad(45)); // rotate on x axis by 45 deg

const plane = new Plane(v1, 0);
const raycaster = new Raycaster();
const intersects = new Vector3();
const mouse = new Vector2();

export const MapControls = React.forwardRef((props: Props, ref) => {
  const { onChange, objects = [], ...rest } = props;
  const invalidate = useThree(({ invalidate }) => invalidate);
  const defaultCamera = useThree(({ camera }) => camera);
  const domElement = useThree(({ gl }) => gl.domElement);
  const controls = React.useMemo(
    () => new DragControls(objects, defaultCamera, domElement),
    [defaultCamera],
  );

  function onMouseMove(event: MouseEvent) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  React.useEffect(() => {
    controls.activate();
    const callback = (e: ControlsEvent) => {
      invalidate();
      if (onChange) {
        onChange(e);
      }
    };

    const drag = (e: any) => {
      raycaster.setFromCamera(mouse, defaultCamera);
      raycaster.ray.intersectPlane(plane, intersects);
      // e.object.position.set(intersects.x, e.object.position.y, intersects.z);
    };

    const dragstart = () => {
      useStore.getState().mapControlsRef.enabled = false;
    };

    const dragend = () => {
      useStore.getState().mapControlsRef.enabled = true;
    };

    controls.addEventListener("change", callback);
    controls.addEventListener("dragstart", dragstart);
    controls.addEventListener("drag", drag);
    controls.addEventListener("dragend", dragend);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      controls.dispose();
      controls.removeEventListener("change", callback);
      controls.removeEventListener("drag", drag);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onChange, controls, invalidate, domElement]);

  // useFrame(() => controls.update());

  return (
    <primitive
      ref={ref}
      dispose={undefined}
      object={controls}
      enableDamping={true}
      // enableZoom={false}
      // enableRotate={false}
      panSpeed={1.2}
      {...rest}
    />
  );
});

export default MapControls;