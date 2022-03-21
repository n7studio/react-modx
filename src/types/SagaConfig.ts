import { Saga } from "redux-saga";

export interface SagaConfig {
  actionType: string;
  sagaName?: string;
  effectCreator: "takeLatest" | "takeEvery" | undefined;
  saga: Saga<any[]>;
}
