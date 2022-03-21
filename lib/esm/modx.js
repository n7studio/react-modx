import createModularStateHook from "./createModularStateHook";
export var modx = function () {
    var _store;
    var _sagaMiddleware;
    return {
        config: function (store, sagaMiddleware) {
            _store = store;
            _sagaMiddleware = sagaMiddleware;
        },
        createModularStateHook: function (moduleName, initialState, reducersConfig) {
            if (!_store || !_sagaMiddleware) {
                throw Error("Invalid modular store configuration");
            }
            return createModularStateHook(_store, _sagaMiddleware)(moduleName, initialState, reducersConfig);
        },
    };
};
export default modx;
