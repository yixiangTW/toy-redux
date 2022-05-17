// @ts-nocheck
export default function promiseMiddleware({dispatch}) {
	return next => action => {
  	return  isPromise(action.payload) ? action.payload.then(result => dispatch({...action, payload: result})).catch(error => {
    	dispatch({...action, payload: error, error: true});
      return Promise.reject(error)
    }) : next(action)
  }
}


const isPromise = o => o instanceof Promise