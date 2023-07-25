import React, { createContext, useReducer, useContext } from "react";
import {
  getSectorsList,
  getDailyChartFundamentalData,
} from "../services/services";
import {
  initialState,
  sectorReducer,
  ACTIONS,
} from "../reducers/sectorReducer";

const SectorContext = createContext();
const SectorUpdateContext = createContext();

export const useSector = () => {
  return useContext(SectorContext);
};

export const useSectorUpdate = () => {
  return useContext(SectorUpdateContext);
};

const SectorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sectorReducer, initialState);

  const initSectors = async (sectorsState) => {
    const sectors = await getSectorsList();
    const sectorsData = await getDailyChartFundamentalData(sectorsState);
    dispatch({
      type: ACTIONS.INIT_SECTORS,
      payload: { sectors, sectorsState, sectorsData },
    });
  };

  const updateSectorsData = async (ratio, startDate = "", endDate = "") => {
    const sectorsState = state.sectorsState;
    const sectorsData = await getDailyChartFundamentalData(
      sectorsState,
      ratio,
      startDate,
      endDate
    );
    dispatch({
      type: ACTIONS.GET_SECTORS,
      payload: sectorsData,
    });
  };

  const toggleSector = async (sectorId) => {
    const selected = state.sectorsState;
    const sectorsData = state.sectorsData;
    const selectedIndex = selected.indexOf(sectorId);

    let newSelected = [];

    // If the sector is not selected
    if (selectedIndex === -1) {
      // Get sector data, add to state & update selected state
      const sectorData = await getDailyChartFundamentalData(sectorId);
      dispatch({
        type: ACTIONS.ADD_SECTOR,
        payload: sectorData[0],
      });
      newSelected = newSelected.concat(selected, sectorId);
    } else {
      // Remove sector from sectorsData & update selected state
      const newSectorsData = sectorsData.filter(
        (sectorData) => sectorData.sectorid !== sectorId
      );
      dispatch({
        type: ACTIONS.REMOVE_SECTOR,
        payload: newSectorsData,
      });
      if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
    }

    dispatch({
      type: ACTIONS.UPDATE_STATE,
      payload: newSelected,
    });
  };

  return (
    <SectorContext.Provider value={state}>
      <SectorUpdateContext.Provider
        value={{ initSectors, toggleSector, updateSectorsData }}
      >
        {children}
      </SectorUpdateContext.Provider>
    </SectorContext.Provider>
  );
};

export default SectorProvider;
