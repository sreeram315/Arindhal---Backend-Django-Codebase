
import React from 'react'
import { Redirect } from 'react-router-dom'

import './css.css'

class RedirectTo extends React.Component {
  render () {
    return (
      <div>
        <Redirect to={this.props.path} />
      </div>
    )
  }
}
export default RedirectTo
