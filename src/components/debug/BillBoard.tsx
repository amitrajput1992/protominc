import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

/**
 * By default BillBoarding gets locked to y axis only
 * @param children
 * @param lockX
 * @param lockY
 * @param lockZ
 * @constructor
 */
export const BillBoard = (
  {
    children,
    lockX = false,
    lockY = false,
    lockZ = false
  }: { children: React.ReactNode, lockX?: boolean, lockY?: boolean, lockZ?: boolean }) => {
  const ref = useRef<Group>();

  useFrame(({ camera }) => {
    if (!ref.current) {
      return;
    }
    const prev = {
      x: ref.current.rotation.x || 0,
      y: ref.current.rotation.y || 0,
      z: ref.current.rotation.z || 0
    };

    ref.current.lookAt(camera.position);
    lockX && (ref.current.rotation.x = prev.x);
    lockY && (ref.current.rotation.y = prev.y);
    lockZ && (ref.current.rotation.z = prev.z);
  });

  return (
    <group ref={ref} name={"BillBoarding"}>
      {children}
    </group>
  );
};