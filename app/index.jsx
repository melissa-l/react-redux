import React, { Component } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { Provider,connect } from 'react-redux'
import configureStore from './store/configureStore'
import RouterMap from './router/index.jsx'
import './static/css/common.less'
import LocalStore from './util/localStore.js'
import {CITYNAME} from './config/localStore.js'
import * as userInfoActionsFromOtherFile from './actions/userinfo.js'

class App extends Component {
  // const { dispatch, visibleTodos, visibilityFilter } = this.props
  constructor(props, context) {
    super(props, context)
    this.state = {
      initDone: false
    }
  }

  componentDidMount(){
    //从localstorerage里获取城市
    let cityName = LocalStore.getItem(CITYNAME)
    if( cityName == null ){
      cityName = '北京'
    }
    console.log(cityName)
    //将城市信息存储到 Redux 中
    console.log(this.props)
    this.props.userInfoActions.update({
      cityName: cityName
    })
    this.setState({
      initDone: true
    })
  }

  render(){
    return (
      <div>
        {this.state.initDone? <RouterMap /> : <h1>加载中...</h1>}
      </div>
    )
  }
}
// Redux
function mapStateToProps(state){
  return {}
}
function mapDispatchToProps(dispatch){
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(App)

const store = configureStore()
render(
  <Provider store={store}>
      <App/>
  </Provider>,
  document.getElementById('root')
)
