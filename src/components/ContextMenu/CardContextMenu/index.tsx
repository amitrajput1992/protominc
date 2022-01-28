import React from "react";
import {
  Menu,
  Item,
  Separator,
  ItemParams
} from "react-contexify";
import { useStore } from "../../../state/store";
import { cloneDeep } from "lodash-es";

export const cardContextMenuId = "card-context-menu";

const ContextMenu = () => {

  function onItemClick({event, props, triggerEvent, data}: ItemParams) {
    useStore.getState().setMove(true);
  }

  function deleteItem() {
    const contextCardId = useStore.getState().contextCardId;
    const json = useStore.getState().json;
    delete json.cards[contextCardId];
    useStore.getState().commit(cloneDeep(json));
  }

  return (
    <Menu id={cardContextMenuId}>
      <Item onClick={onItemClick}>
        Move
      </Item>
      <Item onClick={deleteItem}>
        Delete
      </Item>
      <Separator />
      <Item disabled>Disabled</Item>
    </Menu>
  );
};

export default ContextMenu;