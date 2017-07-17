import React from 'react'
import { render } from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'

// import './static/css/common.less'

class Hello extends React.Component {
  constructor(props, context) {
      super(props, context)
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
      this.state = {
          // 显示当前时间
          now: Date.now()
      }
  }
    render() {
      const arr = ['a', 'b', 'c']
      return (
          <div>
          {arr.map((item,index) => {
            return <p key = {`我是${index}`}>this is {item}</p>
          })}
              {this.props.aaa}
              <p onClick = {this.clicknow.bind(this)}>{this.state.now}</p>
          </div>
        )
      }
      clicknow = () =>{
        this.setState({
          now: Date.now()
        })
      }

}

export default Hello;
