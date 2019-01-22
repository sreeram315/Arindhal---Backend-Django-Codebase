import React from 'react'
import { Row, Col } from 'reactstrap'
import classNames from 'classnames'

import './css.css'

class Display2Data extends React.Component {
  render () {
    var big
    if (this.props.big) { big = true } else { big = false }
    var value_classes = classNames({ 'big_font': big }, 'al_re')
    var index_classes = classNames('lead index_re al_re disp_inline', { 'pt-1': big })
    return (

      <div className='py-2'>
        <Row>
          <Col md={{ size: 4 }} xs={{ size: 12 }} className={index_classes}>
            <strong>{this.props.index}</strong>
          </Col>

          <Col md={{ size: 8 }} xs={{ size: 12 }} className='lead al_re disp_inline'>
            <div className={value_classes}>{this.props.value}</div>
          </Col>
        </Row>
      </div>
    )
  }
}

class DisplayData extends React.Component {
  render () {
    var big
    if (this.props.big) { big = true } else { big = false }
    var value_classes = classNames({ 'big_font': big }, 'al_re')
    var index_classes = classNames('lead index_re al_re disp_inline', { 'pt-1': big })
    return (

      <div className='py-2'>
        <Row>
          <Col md={{ size: 2 }} xs={{ size: 12 }} className={index_classes}>
            <strong>{this.props.index}</strong>
          </Col>

          <Col md={{ size: 10 }} xs={{ size: 12 }} className='lead al_re disp_inline'>
            <div className={value_classes}>{this.props.value}</div>
          </Col>
        </Row>
      </div>
    )
  }
}

export { DisplayData, Display2Data }
