import { createStore, applyMiddleware } from './Redux'

import reducer from './reducer'
import initState from './initState'

import ReduxThunk from './redux-thunk'
import promiseMiddleware from './redux-promise'

const store = createStore(reducer, initState, applyMiddleware(ReduxThunk, promiseMiddleware))

export default store
