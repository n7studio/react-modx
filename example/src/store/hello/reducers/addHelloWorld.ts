import { ReducerCallable } from "react-modx";
import { Types } from "../types";

import { HelloWorldInterface } from "../../../models/HelloWorldInterface";
import { HelloStoreInterface } from "../HelloStoreInterface";

export const addHelloWorld: ReducerCallable = {
  type: Types.ADD_HELLO_WORLD,
  call: (currentState: HelloStoreInterface, helloWorld: HelloWorldInterface[]) => {
    return {
      ...currentState,
      example: helloWorld[0],
    };
  },
};

