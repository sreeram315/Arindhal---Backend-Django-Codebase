import React from 'react'
import { Row, Col, Input, FormFeedback } from 'reactstrap'
import classNames from 'classnames'

import './css.css'

class DisplayEdit2Data extends React.Component {

  handleOnChange = (e) => {
    let {onChangeCallBack} = this.props
    onChangeCallBack(e)
  }

  render () {
    let { big, index, valid, invalid, value, type, name, validFeedback, invalidFeedback } = this.props
    if (big) { big = true } else { big = false }
    var value_classes = classNames({ 'big_font': big }, 'al_re')
    var index_classes = classNames('lead index_re al_re disp_inline', { 'pt-1': big })
    return (

      <div className='py-2'>
        <Row>
          <Col md={{ size: 4 }} xs={{ size: 12 }} className={index_classes}>
            <strong>{index}</strong>
          </Col>

          <Col md={{ size: 8 }} xs={{ size: 12 }} className='lead al_re disp_inline'>
            <Input valid={valid} invalid={invalid} type={type} name={name} id='name' placeholder='Jonathan Thakur' value={value} onChange={this.handleOnChange} />
                <FormFeedback invalid className="al_re">{invalidFeedback}</FormFeedback>
                <FormFeedback valid className="al_re">{validFeedback}</FormFeedback>
          </Col>
        </Row>
      </div>
    )
  }
}

class DisplayEditData extends React.Component {

  handleOnChange = (e) => {
    let {onChangeCallBack} = this.props
    onChangeCallBack(e)
  }

  render () {
    let { big, index, valid, invalid, value, type, name, invalidFeedback, validFeedback } = this.props
    if (big) { big = true } else { big = false }
    var value_classes = classNames({ 'big_font': big }, 'al_re')
    var index_classes = classNames('lead index_re al_re disp_inline', { 'pt-1': big })
    return (

      <div className='py-2'>
        <Row>
          <Col md={{ size: 2 }} xs={{ size: 12 }} className={index_classes}>
            <strong>{index}</strong>
          </Col>

          <Col md={{ size: 10 }} xs={{ size: 12 }} className='lead al_re disp_inline'>
            <Input valid={valid} invalid={invalid} type={type} name={name} id='name' placeholder='Jonathan Thakur' value={value} onChange={this.handleOnChange} />
                <FormFeedback invalid={invalid} className="al_re">{invalidFeedback}</FormFeedback> 
                <FormFeedback valid={valid} className="al_re">{validFeedback}</FormFeedback>
          </Col>
        </Row>
      </div>
    )
  }
}

export { DisplayEdit2Data, DisplayEditData }
