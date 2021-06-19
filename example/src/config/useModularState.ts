import { modx, StateCallableMapObjectInterface } from "react-modx";
import { useDependency } from "react-di";

export const useModularState = (moduleName: string, initialState: any, callableMap: StateCallableMapObjectInterface) => {
  const store = useDependency("store");
  const saga = useDependency("sagaMiddleware");
  const storeModx = modx()
  storeModx.config(store, saga);
  
  return storeModx.useModularState(moduleName, initialState, callableMap);
};
