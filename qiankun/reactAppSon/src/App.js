import './App.css'

import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import routes from './route'

function App() {
  return (
    <div className="App">
      这是react子项目
      <Router>
      <div className="nav">
        <Link to="/react-app/home">首页</Link>
        <Link to="/react-app/about">关于</Link>
      </div>
        <Switch>
          {routes.map((item) => (
            <Route
              key={item.name}
              path={item.path}
              component={item.component}
            ></Route>
          ))}
        </Switch>
      </Router>
    </div>
  )
}

export default App
