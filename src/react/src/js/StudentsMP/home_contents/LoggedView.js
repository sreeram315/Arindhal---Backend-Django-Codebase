import React from 'react'
// import { CustomInput, FormGroup, Label } from 'reactstrap'

import './css.css'

class LoggedView extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        Welcome "name"
      </div>
    )
  }
}
export default LoggedView
