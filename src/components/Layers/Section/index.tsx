import React, { useRef } from "react";
import Card from "./components/Card";
import { ThreeEvent } from "@react-three/fiber";
import { useContextMenu } from "react-contexify";
import { menuID } from "../../ContextMenu";
import { useStore } from "../../../state/store";

const Section = () => {
  const mainSceneRef = useRef();
  const json = useStore(s => s.json);
  const cards = Object.values(json.cards);

  const { show } = useContextMenu({
    id: menuID
  });

  function onContextMenu(e: ThreeEvent<MouseEvent>, cid: number) {
    useStore.getState().setContextCardId(cid);
    show(e as any);
  }

  console.log(cards);

  return (
    <group ref={mainSceneRef}>
      {/* contains all the cards */}
      {
        cards.map((c: any) => (
          <group position={[c.pos[0], c.pos[1], 0]} onContextMenu={(e) => onContextMenu(e, c.id)} key={c.id}>
            <Card />
          </group>
        ))
      }
    </group>
  );
}

export default Section;