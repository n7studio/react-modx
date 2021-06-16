import { ReducerCallableMapObjectInterface } from "./ReducerCallableMapObjectInterface";
import { SagaCallableMapObjectInterface } from "./SagaCallableMapObjectInterface";

export interface StateCallableMapObjectInterface {
  reducers: ReducerCallableMapObjectInterface;
  sagas: SagaCallableMapObjectInterface;
}
