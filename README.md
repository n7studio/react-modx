# React-modx

React-modx is an implementation of a Design Pattern Modular Redux. (https://www.genui.com/resources/modular-redux)

## What is Modular Redux?

From the point of view of modular design, there were four main opportunities for improving Redux design patterns:

- Encapsulate
- Consolidate
- Isolate
- Minimize

## Example

You can look at the example in the git repository (https://github.com/nine7soft/react-modx)
### Hook

```javascript
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
```

### Saga

```javascript
import { put, getContext, call } from "redux-saga/effects";
import { SagaCallable } from "react-modx";
import { Types } from "../types";

export const getHelloWorld: SagaCallable = {
  type: Types.GET_HELLO_WORLD,
  call: function* () {
    const fakeApiClient: any = yield getContext("fakeApiClient");

    const response = yield call([fakeApiClient, "getHelloWorld"]);

    yield put({ type: Types.ADD_HELLO_WORLD, payload: response });
  },
};
```

### Reducer

```javascript
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
```
