import React from "react";
import {
  Menu,
  Item,
  Separator,
  ItemParams,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { photospheres, useStore } from "../../../state/store";
import { cloneDeep } from "lodash-es";

export const backgroundContextMenuId = "background-context-menu";

const ContextMenu = () => {
  function addNewCard({ event, props, triggerEvent, data }: ItemParams) {
    const { x, y } = props;
    const json = useStore.getState().json;
    const id = Date.now();
    const newCard = {
      id: id,
      name: id,
      pos: [x, y],
      color: getRandomColor(),
      url: photospheres[Math.floor(Math.random() * photospheres.length)]
    };
    json.cards[id] = newCard;
    useStore.getState().commit(cloneDeep(json));
  }

  return (
    <Menu id={backgroundContextMenuId}>
      <Item onClick={addNewCard}>
        Add new card
      </Item>
      <Separator />
      <Item disabled>Disabled</Item>
    </Menu>
  );
};

export default ContextMenu;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}