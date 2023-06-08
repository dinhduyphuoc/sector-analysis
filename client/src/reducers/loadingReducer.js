export const initialState = {
  loading: false,
  progress: 0,
};

export const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_PROGRESS: "SET_PROGRESS",
};

export const loadingReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ACTIONS.SET_PROGRESS:
      return {
        ...state,
        progress: payload,
      };
  }
};
