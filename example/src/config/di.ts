import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Container } from "react-di";
import { FakeApiClient } from "../api/FakeApiClient";


export default {
  store: (container: Container) => {
    const sagaMiddleware = container.get("sagaMiddleware");

    const middlewares = [];
    middlewares.push(applyMiddleware(sagaMiddleware));


    return createStore((store) => store, compose(...middlewares));
  },
  sagaMiddleware: (container: Container) => {
    const apiClient = container.get("apiClient");

    return createSagaMiddleware({
      context: {
        apiClient,
      },
    });
  },
  apiClient: (container: Container) => {
    const fakeApiClient = new FakeApiClient();

    return fakeApiClient;
  },
};
