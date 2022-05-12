const reducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch(type) {
    case 'UpdateUser':
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        }
      }
    default:
      return { ...state }
  }

}

export default reducer
