export const initialState = {
  sectors: [],
  sectorsState: [],
  sectorsData: [],
};

export const ACTIONS = {
  INIT_SECTORS: "INIT_SECTORS",
  UPDATE_STATE: "UPDATE_STATE",
  UPDATE_SECTORS: "UPDATE_SECTORS",
  ADD_SECTOR: "ADD_SECTOR",
  REMOVE_SECTOR: "REMOVE_SECTOR",
};

export const sectorReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.INIT_SECTORS:
      return {
        ...state,
        sectors: payload.sectors,
        sectorsState: payload.sectorsState,
        sectorsData: payload.sectorsData,
      };
    case ACTIONS.UPDATE_STATE:
      return {
        ...state,
        sectorsState: payload,
      };
    case ACTIONS.UPDATE_SECTORS:
      return {
        ...state,
        sectorsData: payload,
      };
    case ACTIONS.ADD_SECTOR:
      return {
        ...state,
        sectorsData: [...state.sectorsData, payload],
      };
    case ACTIONS.REMOVE_SECTOR:
      return {
        ...state,
        sectorsData: payload,
      };
  }
};
