import { connect } from '../../Redux'
import './style.css'

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
    <div className="modify-user">
      <div>组件 ModifyUser</div>
      <span>修改 user name</span>
      <input onChange={handleClick}/>
    </div>
  )
})

export default ModifyUser