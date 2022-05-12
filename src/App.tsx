import { Provider, connect } from './Redux'
import store from './store'

function App() {
  console.log('app render')
  return (
    <Provider store={store}>
      <ModifyUser />
      <User />
      <Group />
    </Provider>
  );
}

const stateToProps = (state: any) => {
  return {
    group: state.group.name
  }
}
const Group = connect(stateToProps)(({group}: {group: any}) => {
  console.log('Group render')
  return <div>
    {group}
  </div>
})


const userStateToProps = (state: any) => {
  return {
    user: state.user
  }
}
const User = connect(userStateToProps)(({user, dispatch}: {user: any, dispatch: any}) => {
  console.log('User render')
  return <div>{user.name}</div>
})

const ModifyUser = connect()(({state, dispatch}: {state: any, dispatch: any}) => {

  const handleClick = (e: any) => {
    dispatch({
      type: 'UpdateUser',
      payload: {
        name: e.target.value
      }
    })
  }

  return (
    <>
      <small>修改 user state</small>
      <input onChange={handleClick}/>
      <button onClick={handleClick}>修改</button>
    </>
  )
})

export default App;
