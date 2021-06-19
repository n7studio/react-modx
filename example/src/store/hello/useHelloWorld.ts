import { useModularState } from "../../config/useModularState";
import * as reducers from "./reducers";
import * as sagas from "./sagas";
import { HelloStoreInterface } from "./HelloStoreInterface";

export function useHelloWorld() {
  const initialState: HelloStoreInterface = {
    example: {
      title: "",
      description: "",
    },
  };

  const [helloWorldValue, actions] = useModularState("helloWorldValue", initialState, {
    reducers: { ...reducers },
    sagas: { ...sagas },
  });

  return { helloWorldValue, actions };
}
