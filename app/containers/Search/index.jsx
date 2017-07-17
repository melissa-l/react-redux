import React from 'react'
import { render } from 'react-dom'

import PureRenderMixin from 'react-addons-pure-render-mixin'

// import './static/css/common.less'

class NotFound extends React.Component {

  render() {
    return (
        <div>
          {console.log('404,出做啦')}
          <h1>404 NotFound</h1>
        </div>
      )
    }
}

export default NotFound;
