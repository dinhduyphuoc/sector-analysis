import { create } from "zustand";
import { getSectorsList, getSectorData } from "../services/services";

const sectorsStore = create((set) => ({
  sectors: [],
  sectorsState: [],
  sectorsData: [],
  initSectors: async (sectorsId) => {
    try {
      const sectorsList = await getSectorsList();
      const sectorsData = await Promise.all(
        sectorsId.map((sectorId) => getSectorData(sectorId))
      );
      set({
        sectorsData: sectorsData,
        sectors: sectorsList,
        sectorsState: sectorsId,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateState: async (sectorId) => {
    const selected = sectorsStore.getState().sectorsState;
    const sectorsData = sectorsStore.getState().sectorsData;
    const selectedIndex = selected.indexOf(sectorId);

    let newSelected = [];

    // If the sector is not selected
    if (selectedIndex === -1) {
      // Get sector data, add to state & update selected state
      const sectorData = await getSectorData(sectorId);
      set({ sectorsData: [...sectorsData, sectorData] });
      newSelected = newSelected.concat(selected, sectorId);
    } else {
      // Remove sector from sectorsData & update selected state
      const newSectorsData = sectorsData.filter(
        (sectorData) => sectorData.sectorid !== sectorId
      );
      set({ sectorsData: newSectorsData });
      if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        console.log(newSelected);
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
    }

    set({ sectorsState: newSelected });
  },
}));

export default sectorsStore;
