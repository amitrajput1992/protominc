import create from "zustand";
import { cloneDeep } from "lodash-es";

const json = {
  cards: {
    1: {
      id: 1,
      name: "amit",
      pos: [0, 0],
    },
  },
};

export const useStore = create<any>(set => ({
  json: cloneDeep(json),
  commit: (json: any) => set({ json }),

  mapControlsRef: null,
  updateMapControlsRef: (v: any) => set({ mapControlsRef: v }),

  backgroundRef: null,
  updateBackgroundRef: (v: any) => set({ backgroundRef: v }),

  contextCardId: null,
  setContextCardId: (v: any) => set({ contextCardId: v }),

  move: false,
  setMove: (v: boolean) => set({ move: v }),

}));