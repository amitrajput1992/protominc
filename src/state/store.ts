import create from "zustand";
import { cloneDeep } from "lodash-es";

export const photospheres = [
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/df81ab14-7891-44d4-a7e1-39ca1e636acf/o/360_abbots_kitchen%2016%20Panorama%20(Custom).jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/cd20902a-825d-4d80-a7d0-80d1fff75e09/o/360_abbots_kitchen%2016%20Panorama.jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/a98e59cc-91c9-4593-9d90-924118798438/o/360_arc_spitfire.jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/bc29550e-d571-4f5a-834d-f7bef89142aa/o/360_atkinsons_coffee1%20(Custom).jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/3d9a852e-850e-4e6a-a4f7-17b67b440872/o/360_banqueting_house0039%20Panorama%20copy.jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/d7d03c1e-fce3-4709-90de-4e8caf403439/o/360_barter_books.jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/085ff5ce-ed17-4cbe-a71c-9f9b8240e934/o/360_beamish0287%20Panorama.jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/a2881b6d-ed05-4320-916f-bca675ee6280/o/360_berry_brothers_and%20_rudd_shop%20(Custom).jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/6d9e5998-a6ee-40bc-9bfc-4a286c9c0b6c/o/360_bike_park%20(Custom).jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/ccf22801-5b8f-4a34-a47f-dc418f37cbab/o/360_chester_cathedral_heights%20(Custom).jpg",
  "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/46e12820-7eb8-4917-a693-ce6a843c8ae3/o/360%20Chinese%20lanterns%20(Custom).jpg",
];

const json = {
  cards: {
    1: {
      id: 1,
      name: "amit",
      pos: [0, 0],
      color: "#FF0000",
      url: photospheres[0]
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