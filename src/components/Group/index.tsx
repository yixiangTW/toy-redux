import { connect } from '../../Redux'
import './style.css'
const stateToProps = (state: any) => {
  return {
    group: state.group.name
  }
}

const Group = connect(stateToProps)(({group}: {group: any}) => {
  console.log('Group render')
  return <div className="group">
    <div>组件 Group</div>
    {group}
  </div>
})

export default Group
