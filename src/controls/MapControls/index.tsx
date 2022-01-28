import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { MapControls as MapControlsImpl } from "./Impl";
import type { Camera } from "three";

type ControlsEvent = {
  type: string
};

type Props = {
  camera?: Camera,
  onChange?: (e: any) => void,
  onStart?: () => void,
  onEnd?: () => void,
};

export const MapControls = React.forwardRef((props: Props, ref) => {
  const { camera, onChange, onStart, onEnd, ...rest } = props;
  const invalidate = useThree(({ invalidate }) => invalidate);
  const defaultCamera = useThree(({ camera }) => camera);
  const domElement = useThree(({ gl }) => gl.domElement);
  const controls = React.useMemo(
    () => new MapControlsImpl(defaultCamera),
    [defaultCamera],
  );

  React.useEffect(() => {
    controls.connect(domElement);
    const callback = (e: ControlsEvent) => {
      invalidate();
      if (onChange) {
        onChange(e);
      }
    };
    controls.addEventListener("change", callback);

    if (onStart) {
      controls.addEventListener("start", onStart);
    }
    if (onEnd) {
      controls.addEventListener("end", onEnd);
    }

    return () => {
      controls.dispose();
      controls.removeEventListener("change", callback);
      if (onStart) {
        controls.removeEventListener("start", onStart);
      }
      if (onEnd) {
        controls.removeEventListener("end", onEnd);
      }
    };
  }, [onChange, onStart, onEnd, controls, invalidate, domElement]);

  useFrame(() => controls.update());

  return (
    <primitive
      ref={ref}
      dispose={undefined}
      object={controls}
      enableDamping={true}
      enableZoom={false}
      enableRotate={false}
      panSpeed={1.2}
      {...rest}
    />
  );
});

export default MapControls;