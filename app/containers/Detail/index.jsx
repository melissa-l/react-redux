import React from 'react'

import PureRenderMixin from 'react-addons-pure-render-mixin'

// import './static/css/common.less'

class Detail extends React.Component {

  render() {
    return (
        <p>Detail，url参数：{this.props.params.id}</p>
      )
    }

}

export default Detail;
