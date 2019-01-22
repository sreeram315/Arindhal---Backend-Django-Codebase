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
    var data = { 'name': 'Damini Naggi',
      'reg_no': 11610382,
      'cgpa': 8.52,
      'section': 'E1615',
      'gender': 'F',
      'dob': '1998-08-03',
      'batch': null,
      'contact': '7347270981',
      'address': 'House No. 149, Sunderbani, Sunderban Sunderbani - Jammu And Kashmir India',
      'description': 'She was a very hard working girl!',
      'father_name': 'Raj Kumar Naggi',
      'mother_name': 'Rekha Naggi',
      'father_contact': '9419152281',
      'mother_contact': '9906089233',
      'department': 'P136 : B.Tech. (Electrical Engineering)',
      'school': '"School of Electronics and Electrical Engineering (SEEE) "',
      'extra_content': 'Father 9419152281 11610382 Father 9906089233 11610382 Student 7347270981',
      'image': 'https://i.ibb.co/W0w7dpq/11610382.png',
      'owner': 'srm',
      'slug': 'damini-naggi-a76a' }
    data = this.props.data
    if (data['gender'] === 'F') {
      data['gender'] = 'Female'
    } else {
      data['gender'] = 'Male'
    }
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
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><Display2Data index='Gender' value={data.gender} /></Col>
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
