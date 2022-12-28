import { Store, Reducer, CreateStore, InitState } from './type'

let state: InitState;
let reducer: Reducer<InitState>;
let listeners: any = [];

const store: Store = {
  getState: () => state,
  dispatch: (_action) => {
    setState(reducer(state, _action));
    return _action;
  },
  subscribe: (fn) => {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn)
      listeners.splice(index, 1)
    }
  }
}

const setState = (_state: InitState) => {
  state = _state
  listeners.map((fn: any) => fn(_state))
}


export const createStore: CreateStore<InitState> = (_reducer, _init, enhancer) => {
  reducer = _reducer;
  state = _init;
  if(enhancer) {
    store.dispatch = enhancer(createStore)(_reducer, _init).dispatch
  }
  return store
}

export const applyMiddleware = (...middlewares: any[]) => (_createStore: CreateStore<InitState>) => (_reducer: Reducer<InitState>, _init: InitState) => {
  let store = _createStore(_reducer, _init)
  let dispatch = store.dispatch

  const middlewareAPI = {
    getState: store.getState,
    dispatch: (action: any) => dispatch(action)
  }
  const chain = middlewares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...chain)(store.dispatch)
  return {
    ...store,
    dispatch
  }
}

let compose = (...middlewares: any) => {
  return (dispatch: any) => {
    return middlewares.reduceRight((init: any, current: any) => current(init), dispatch)
  }
}
