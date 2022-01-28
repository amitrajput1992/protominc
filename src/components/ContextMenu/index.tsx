import React from "react";
import CardContextMenu from "./CardContextMenu";
import BackgroundContextMenu from "./BackgroundContextMenu";

const ContextMenu = () => {
  return (
    <>
      <CardContextMenu />
      <BackgroundContextMenu />
    </>
  );
};

export default ContextMenu;