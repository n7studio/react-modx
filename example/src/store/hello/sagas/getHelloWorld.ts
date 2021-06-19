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
