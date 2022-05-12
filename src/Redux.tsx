import React, { useEffect, useState } from 'react'
import { Connect } from './type'

let state: any;
let reducer: any = null;
let listeners: any = [];

const store = {
  getState: () => state,
  dispatch: (_action: any) => {
    setState(reducer(state, _action))
  },
  subscribe: (fn: any) => {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn)
      listeners.splice(index, 1)
    }
  }
}

const setState = (_state: any) => {
  state = _state
  listeners.map((fn: any) => fn(_state))
}
const Context = React.createContext(null)

export const Provider = ({ store, children }: { store: any, children: any}) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const createStore = (_reducer: any, _init: any) => {
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

export const connect: Connect = (mapStateToProps, mapDispatchToProps) => (Component: any) => (props: any) => {
  
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