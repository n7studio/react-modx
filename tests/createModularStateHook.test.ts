import createModularStateHook from '../src/createModularStateHook';
import configureMockStore from 'redux-mock-store';

test('Invalid store cannot be provided', () => {
    let store:any = null;
    const sagaMiddleware:any = null;

    expect(() => {
        createModularStateHook(store, sagaMiddleware)
    }).toThrow('Invalid store provided when calling createModularStateHook function.');

    store = {};
    expect(() => {
        createModularStateHook(store, sagaMiddleware)
    }).toThrow('Invalid store provided when calling createModularStateHook function.');
});

test('Invalid saga middleware cannot be provided', () => {
    let store:any = configureMockStore()();
    const sagaMiddleware:any = null;

    expect(() => {
        createModularStateHook(store, sagaMiddleware)
    }).toThrow('Invalid saga middleware provided when calling createModularStateHook function.');

    expect(() => {
        createModularStateHook(store, sagaMiddleware)
    }).toThrow('Invalid saga middleware provided when calling createModularStateHook function.');
});
