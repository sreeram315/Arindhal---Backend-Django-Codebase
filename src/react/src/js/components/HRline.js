import React from 'react'

import './css.css'

class HRline extends React.Component {
  render () {
    return (
      <div className={this.props.cn}>
        <hr />
      </div>
    )
  }
}
export default HRline
