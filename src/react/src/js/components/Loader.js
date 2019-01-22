import React from 'react'
import classNames from 'classnames'

import './css.css'

class Loader extends React.Component {
  render () {
    var loader_classes = classNames('spinner-border text-primary',
      { 'big_loader_re': this.props.big })
    var divClasses = classNames(
      `d-flex justify-content-${this.props.align} float-${this.props.align}`,
      `p-${this.props.pad}`
    )
    return (
      <div>
        <div className={divClasses}>
          <div className={loader_classes} role='status' />
        </div>
      </div>
    )
  }
}
export default Loader
