import { useReducer, useContext, createContext } from "react";
import {
  initialState,
  loadingReducer,
  ACTIONS,
} from "../reducers/loadingReducer";

const LoadingContext = createContext();
const LoadingUpdateContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const useLoadingUpdate = () => {
  return useContext(LoadingUpdateContext);
};

const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  const setProgress = (progress) => {
    dispatch({
      type: ACTIONS.SET_PROGRESS,
      payload: progress,
    });
  };
  const helloWorld = () => {
    console.log(state);
  };

  return (
    <LoadingContext.Provider value={state}>
      <LoadingUpdateContext.Provider value={{ setProgress, helloWorld }}>
        {children}
      </LoadingUpdateContext.Provider>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
