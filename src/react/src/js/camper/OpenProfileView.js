import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

import NavbarMain from '../navbar/NavbarMain'
import OpenProfileData from './OpenProfileData'
import ImageComp from '../components/ImageComp'

class OpenProfileView extends React.Component {
  render () {
    let { slug } = this.props.match.params
    return (
      <div>
        <NavbarMain />

        <div className='p-5'>
          <div className='container-fluid'>
            <Row >
              <Col lg={{ size: 10 }} md={{ size: 12 }}>
                <Row>
                  <Col md={{ size: 8, order: 1 }} xs={{ size: 12, order: 2 }}>
                    <OpenProfileData slug={slug} />
                  </Col>
                  <Col md={{ size: 3, order: 2 }} xs={{ size: 12, order: 1 }} className='img_class_local'>
                    <ImageComp src='' width='100%' cn='img-responsive img-thumbnail' border_cn='img_border_grey' />

                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
export default OpenProfileView
