import { connect } from '../../Redux'
import './style.css'

const ModifyUser = connect(undefined, (dispatch) => {
  return {
    updateUser: (uname: string) => dispatch({type: 'UpdateUser', payload: {name: uname}})
  }
})(({state, updateUser}: {state: any, updateUser: any}) => {

  // const handleClick = (e: any) => {
  //   dispatch({
  //     type: 'UpdateUser',
  //     payload: {
  //       name: e.target.value
  //     }
  //   })
  // }

  const handleClick = (e: any) => {
    updateUser(e.target.value)
  }

  return (
    <div className="modify-user">
      <div>组件 ModifyUser</div>
      <span>修改 user name</span>
      <input onChange={handleClick}/>
    </div>
  )
})

export default ModifyUser