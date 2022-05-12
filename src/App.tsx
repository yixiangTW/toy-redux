import { Provider } from './Redux'
import ModifyUser from './components/ModifyUser'
import User from './components/User'
import Group from './components/Group'
import store from './store'
import './App.css'

function App() {
  console.log('App render')
  return (
    <Provider store={store}>
      <ModifyUser />
      <User />
      <Group />
    </Provider>
  );
}

export default App;
