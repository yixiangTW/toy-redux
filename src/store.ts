import { createStore } from './Redux'

import reducer from './reducer'
import initState from './initState'

const store = createStore(reducer, initState)

export default store
