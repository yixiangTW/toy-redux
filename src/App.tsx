import { Provider } from './Redux'
import ModifyUser from './components/ModifyUser'
import User from './components/User'
import Group from './components/Group'
import State from './components/State'
import store from './store'
import './App.css'

function App() {
  console.log('App render')
  return (
    <Provider store={store}>
      <div className="app">
        <div>
          <State />
        </div>
        <div>
          <ModifyUser />
          <User />
          <Group />
        </div>
      </div>
    </Provider>
  );
}

export default App;
