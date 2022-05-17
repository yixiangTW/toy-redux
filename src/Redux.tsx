import React, { useEffect, useState } from 'react'
import { Connect, Store, Reducer, CreateStore, InitState, MapDispatchToProps } from './type'

let state: InitState;
let reducer: Reducer<InitState>;
let listeners: any = [];

const store: Store = {
  getState: () => state,
  dispatch: (_action) => {
    setState(reducer(state, _action))
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
const Context = React.createContext({})

export const Provider = ({ store, children }: { store: Store, children: any}) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const createStore: CreateStore<InitState> = (_reducer, _init, enhancer) => {
  reducer = _reducer;
  state = _init;
  if(enhancer) {
    store.dispatch = enhancer(createStore)(_reducer, _init).dispatch
  }
  return store
}

const isStateChange = (oldState: any, newState: any) => {
  for(let key in oldState) {
    if(oldState[key] !== newState[key]) {
      return true
    }
  }
  return false
}

export const connect: Connect = (mapStateToProps, mapDispatchToProps?: MapDispatchToProps) => (Component: React.FC) => (props: any) => {
  
  const [, reRender] = useState({})
  const stateProps = mapStateToProps ? mapStateToProps(state) : { state: state}
  const dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch) : { dispatch: store.dispatch }

  useEffect(() => {
    return store.subscribe(() => {
      const newStateProps = mapStateToProps ? mapStateToProps(state) : { state: state};
      if(isStateChange(stateProps, newStateProps)) {
        reRender({})
      }
    })
  }, [mapStateToProps])

  return <Component {...props} {...stateProps} {...dispatchProps} />
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
