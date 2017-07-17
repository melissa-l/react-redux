import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'//react-touter v4.0

import Home from '../containers/Home/index.jsx'
import City from '../containers/City/index.jsx'
import User from '../containers/User/index.jsx'
import Search from '../containers/Search/index.jsx'
import Detail from '../containers/Detail/index.jsx'
import NotFound from '../containers/404.jsx'
import configureStore from '../store/configureStore'

class RouterMap extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route path="/" exact component = {Home} />
            <Route path = '/city' component = {City} />
            <Route path = '/user' component = {User} />
            <Route path = '/search/:type(/:keyword)' component = {Search}/>
            <Route path = '/detail/:id' component = {Detail} />
            <Route component = {NotFound}/>
        </Switch>
      </Router>
    )
  }
}

export default RouterMap
