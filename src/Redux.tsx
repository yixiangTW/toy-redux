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

export const createStore: CreateStore<InitState> = (_reducer, _init) => {
  reducer = _reducer;
  state = _init;
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