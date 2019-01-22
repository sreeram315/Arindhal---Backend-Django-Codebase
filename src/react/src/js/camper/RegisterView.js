import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col, Container } from 'reactstrap'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { fetchPosts, createPost } from '../actions/postActions'

import NavbarMain from '../navbar/NavbarMain'
import './css.css'

import RegisterForm from './RegisterForm'
import LeftOfRegister from './LeftOfRegister'

class RegisterView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      'shit1': 'akrao kept pursuing him and cornered akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valakrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valhis force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6]',
      'shit2': 'akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valakrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valakrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valakrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valakrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river valley.[6],akrao kept pursuing him and cornered his force near a gorge in the Krishna river val'

    }
  }

  render () {
    return (
      <div >
        <NavbarMain />
        <div>

          <div className='container-fluid pt-5'>
            <Row>
              <Col className='hidden-lg' sm={{ size: 0, order: 2 }} md={{ size: 7, order: 1 }}>
                <LeftOfRegister />
              </Col>

              <Col sm={{ size: 12, order: 1 }} md={{ size: 5, order: 2 }} xs='hidden' className='registration_form'>
                <div className='lead font_vbig color_fav pb-3'>
                  <b>Register Form</b>
                </div>

                <div >
                  <RegisterForm />
                </div>
              </Col>

            </Row>
          </div>

        </div>
      </div>
    )
  }
}

export default RegisterView
