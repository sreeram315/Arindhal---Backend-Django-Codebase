import React from 'react'
import { Col, Row } from 'reactstrap'

import HRline from '../components/HRline'
import { DisplayData, Display2Data } from '../components/DisplayData'

class StudentData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {

  }

  render () {
    const { data } = this.props

    return (
      <div>
        <div className='headname_sd_local lead'>{data.name}</div>
        <HRline />

        <div className='container-fluid pb-5'>
          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><Display2Data index='Reg no.' value={data.reg_no} big /></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><Display2Data index='CGPA' value={data.cgpa} big /></Col>
          </Row>

          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><Display2Data index='Section' value={data.section} /></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><Display2Data index='Gender' value={data.gender === 'M' ? 'Male' : 'Female'} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='DOB' value={data.dob} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Contact' value={data.contact} /></Col>
          </Row>

          <HRline cn='padx-10' />

          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><Display2Data index='Father' value={data.father_name} /></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><Display2Data index='Mother' value={data.mother_name} /></Col>
          </Row>

          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><Display2Data index='Contact' value={data.father_contact} /></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><Display2Data index='Contact' value={data.mother_contact} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Department' value={data.department} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='School' value={data.school} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Address' value={data.address} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Description' value={data.description} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Addional content' value={data.extra_content} /></Col>
          </Row>

        </div>

        <HRline />

      </div>
    )
  }
}
export default StudentData
