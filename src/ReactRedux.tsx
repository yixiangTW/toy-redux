import React, { useEffect, useState, useContext } from 'react'
import { Connect, Store, MapDispatchToProps } from './type'

const Context = React.createContext<Store>({} as any)

export const Provider = ({ store, children }: { store: Store, children: any}) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
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
  const store = useContext(Context);
  const [, reRender] = useState({})
  const stateProps = mapStateToProps ? mapStateToProps(store.getState()) : { state: store.getState()}
  const dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch) : { dispatch: store.dispatch }

  useEffect(() => {
    return store.subscribe(() => {
      const newStateProps = mapStateToProps ? mapStateToProps(store.getState()) : { state: store.getState()};
      if(isStateChange(stateProps, newStateProps)) {
        reRender({})
      }
    })
  }, [mapStateToProps])

  return <Component {...props} {...stateProps} {...dispatchProps} />
}