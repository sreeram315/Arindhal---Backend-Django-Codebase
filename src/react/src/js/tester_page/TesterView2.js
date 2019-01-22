import React from 'react'

import { isAuthenticated } from '../utils'

class TesterView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticity: false
    }
  }

  render () {
    console.log(localStorage)
    const authenticity = isAuthenticated()
    console.log('auth', authenticity)
    return (
      <div>
        {authenticity === true ? <div>Authenticated</div> : <div>NOT Authenticated</div> }
      </div>
    )
  }
}

export default TesterView
