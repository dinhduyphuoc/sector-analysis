export const initialState = {
  sectors: [],
  sectorsState: [],
  sectorsData: [],
};

export const ACTIONS = {
  UPDATE_STATE: "UPDATE_STATE",
  GET_SECTORS: "GET_SECTORS",
  ADD_SECTOR: "ADD_SECTOR",
  REMOVE_SECTOR: "REMOVE_SECTOR",
};

export const sectorReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.UPDATE_STATE:
      return {
        ...state,
        sectorsState: payload,
      };
    case ACTIONS.GET_SECTORS:
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
    default:
      return state;
  }
};
