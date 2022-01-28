import React, { useRef } from "react";
import Card from "./components/Card";
import { ThreeEvent } from "@react-three/fiber";
import { useContextMenu } from "react-contexify";
import { useStore } from "../../../state/store";
import { cardContextMenuId } from "../../ContextMenu/CardContextMenu";

const Section = () => {
  const mainSceneRef = useRef();
  const json = useStore(s => s.json);
  const cards = Object.values(json.cards);

  const { show } = useContextMenu({
    id: cardContextMenuId
  });

  function onContextMenu(e: ThreeEvent<MouseEvent>, cid: number) {
    e.stopPropagation();
    useStore.getState().setContextCardId(cid);
    show(e as any);
  }

  return (
    <group ref={mainSceneRef}>
      {/* contains all the cards */}
      {
        cards.map((c: any) => (
          <Card card={c} key={c.id} onContextMenu={onContextMenu}/>
        ))
      }
    </group>
  );
}

export default Section;