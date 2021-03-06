import React from "react";
import Div100vh from "react-div-100vh";
import Canvas from "./components/Canvas";
import ContextMenu from "./components/ContextMenu";
import "react-contexify/dist/ReactContexify.css";

function App() {
  return (
    <Div100vh>
      <Canvas />
      <ContextMenu />
    </Div100vh>
  );
}

export default App;
