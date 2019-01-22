import React from 'react'

import './css.css'

class ImageComp extends React.Component {
  render () {
    return (
      <div className={this.props.border_cn}>
        <img src={this.props.src} width={this.props.width} className={this.props.cn} alt='' />
      </div>
    )
  }
}
export default ImageComp
