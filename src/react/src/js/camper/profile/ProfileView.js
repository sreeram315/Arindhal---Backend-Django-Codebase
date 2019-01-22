import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

import NavbarMain from '../../navbar/NavbarMain'
import UserData from './UserData'
import ImageComp from '../../components/ImageComp'
import Loader from '../../components/Loader'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkAuthAction } from '../../actions/CamperActions'

class ProfileView extends React.Component {
  componentDidMount () {
    this.props.checkAuthAction()
  }
  render () {
    let { isAuthenticated } = this.props
    return (
      <div>
        <NavbarMain />

        {isAuthenticated === true
          ? <div className='p-5'>
            <div className='container-fluid'>
              <Row >
                <Col lg={{ size: 10 }} md={{ size: 12 }}>
                  <Row>
                    <Col md={{ size: 8, order: 1 }} xs={{ size: 12, order: 2 }}>
                      <UserData />
                    </Col>
                    <Col md={{ size: 3, order: 2 }} xs={{ size: 12, order: 1 }} className='img_class_local'>
                      <ImageComp src='/static/images/image_not_found.png' width='100%' cn='img-responsive img-thumbnail' border_cn='img_border_grey' />

                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          : ''}

        {isAuthenticated === false ? <div className='p-5 ac_re color_fav lead'>
          'Please Login to check your profile here'
        </div> : ''}

        {isAuthenticated === null || isAuthenticated === undefined ? <div className='pt-5'><Loader big align='center' /></div> : ''}
      </div>
    )
  }
}

ProfileView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.camper.isAuthenticated
})

export default connect(mapStateToProps, { checkAuthAction })(ProfileView)
