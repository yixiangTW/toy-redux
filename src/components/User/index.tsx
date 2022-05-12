import { connect } from '../../Redux'
import './style.css'

const userStateToProps = (state: any) => {
  return {
    user: state.user
  }
}

const User = connect(userStateToProps)(({user, dispatch}: {user: any, dispatch: any}) => {
  console.log('User render')
  return <div className="user">
      <div>组件 User</div>
    {user.name}</div>
})

export default User