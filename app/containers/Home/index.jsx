import React from 'react'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

// import './static/css/common.less'

class Home extends React.Component {
    render() {
      return (
          <div>
            <p>Home</p>
            <Link to = "/city">to list</Link>
          </div>
        )
      }


}

export default Home;
