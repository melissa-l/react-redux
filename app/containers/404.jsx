import React from 'react'
import { render } from 'react-dom'

import PureRenderMixin from 'react-addons-pure-render-mixin'

// import './static/css/common.less'

class NotFound extends React.Component {

  render() {
    return (
        <div>
          <h1>404 NotFound</h1>
          <h3>无法匹配 <code>{location.pathname}</code></h3>
        </div>
      )
    }
}

export default NotFound;
