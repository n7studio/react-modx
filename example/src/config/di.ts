import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Container } from "react-di";
import { FakeApiClient } from "../api/FakeApiClient";

export const diConfig = {
  store: (container: Container) => {
    const sagaMiddleware = container.get("sagaMiddleware");

    const middlewares = [];
    middlewares.push(applyMiddleware(sagaMiddleware));

    return createStore((store) => store, compose(...middlewares));
  },
  sagaMiddleware: (container: Container) => {
    const fakeApiClient = container.get("fakeApiClient");

    return createSagaMiddleware({
      context: {
        fakeApiClient,
      },
    });
  },
  fakeApiClient: () => {
    const fakeApiClient = new FakeApiClient();
    console.log('fake api client')
    return fakeApiClient;
  },
};
