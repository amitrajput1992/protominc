import React from "react";
import {
  Menu,
  Item,
  Separator,
  ItemParams
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useStore } from "../../state/store";

export const menuID = "context-menu";

const ContextMenu = () => {

  function onItemClick({event, props, triggerEvent, data}: ItemParams) {
    const contextCardId = useStore.getState().contextCardId;
    console.log(contextCardId);
    useStore.getState().setMove(true);
  }

  return (
    <Menu id={menuID}>
      <Item onClick={onItemClick}>
        Move this MF
      </Item>
      <Item>
        Item 2
      </Item>
      <Separator />
      <Item disabled>Disabled</Item>
    </Menu>
  );
};

export default ContextMenu;