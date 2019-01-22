import React from 'react'
import cookie from 'react-cookies'

import SearchBox from '../components/SearchBox'
import HRline from '../components/HRline'
import Loader from '../components/Loader'
import { Row, Col, Table } from 'reactstrap'
import { Link } from 'react-router-dom'

import StudentListSortSection from './StudentListSortSection'
import './css.css'

class StudentList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      StudentData: {
        'count': 0,
        'next': null,
        'previous': null,
        'results': []
      },

      q: '',
      section:'',
      gender:'',
      order_by:'name',
      state:'',
      reverse:'',

      buffering: true,
    }
  }

   onChangeHandle = (event) => {
    let key = event.target.name
    let value = event.target.value
    console.log(key,value)
    if (key==='reverse'){if(this.state.reverse === 'reverse'){value=''}else{value='reverse'}}
    if (key==='limit'){if(/^\d+$/.test(value)){value=value}else{value='';}}
    this.setState({
      [key]: value,
      buffering: true
    }, ()=>{
      console.log(this.state)
      this.loadData()
    })
    
  }

  loadData =  () => {
    const thisComp = this
    console.log('requesting... with q = ', this.state.q)
     const endpoint = `/api/students/all/?q=${this.state.q}&section=${this.state.section}&state=${this.state.state}&gender=${this.state.gender}&order_by=${this.state.order_by}&reverse=${this.state.reverse}&limit=${this.state.limit}`
         // const endpoint = `/api/students/all/?q=`
    let authToken = localStorage.getItem('authToken')
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authToken}`,
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
        thisComp.setState({
          StudentData: responseData,
          buffering: false
        })
      }).catch(function (error) {
        console.log(error)
      })
  }

  updateQueries = (event) => {
    console.log(event)
    let key = event.target.name
    let value = event.target.value
    this.setState({ q: value, buffering: true },function(){  this.loadData() });
   

  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.loadData()
  }

  componentDidMount () {
    this.loadData()
  }

  render () {
    const StudentYeildCount = this.state.StudentData['count']
    const StudentList = this.state.StudentData['results']
    return (
      <div>

        <div className='pt-5 pb-5'>

          <div className='container_fluid'>
            <Row>
              <Col lg={{ size: 8 }} sm={{ size: 12 }}>
                <Row>

                  <Col>
                    <div className='savoye_font headname_re headname_local'>Student List</div>

                    <div className='pad_local apple_font'>
              No. of students Listed: {StudentList.length} out off { StudentYeildCount } yeilded
                    </div>
                  </Col>

                  <Col>

                    <SearchBox  placeholder='Name, Section, id ?' class='sb_local' type='info' name="q" onChange={this.updateQueries} outline />

                  </Col>

                </Row>

              </Col>
            </Row>
          </div>

          <div className='container_fluid'>
            <Row>
              <Col lg={{ size: 8, order: 1 }} xs={{ size: 12, order: 2 }}>
              {this.state.buffering ? <div className='ac_re'><div className='pt-3 student_table_re al_re'>
                    <Table hover THIS IS JUST FOR LOADING PURPOSE>
                      <thead>
                        <tr>
                          <th>Reg No.</th>
                          <th>Name</th>
                          <th>Section</th>
                          <th>Gender </th>
                          <th>DOB</th>
                          <th>CGPA</th>
                          <th>Contact</th>
                        </tr>
                      </thead>
                    </Table></div><Loader align='center' big /></div>

                    
                :<div className='pt-3 student_table_re al_re'>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Reg No.</th>
                        <th>Name</th>
                        <th>Section</th>
                        <th>Gender </th>
                        <th>DOB</th>
                        <th>CGPA</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {StudentList.map((student, index) => {
                        return (
                          <tr>
                            <td>{student.reg_no}</td>
                            <td><Link to={`/smp/student-details/${student.slug}`}>{student.name}</Link></td>
                            <td>{student.section}</td>
                            <td>{student.gender}</td>
                            <td>{student.dob}</td>
                            <td>{student.cgpa}</td>
                            {student.contact !== null && student.contact !== undefined ? <td>{student.contact}</td>
                              : <td><samp> no contact</samp> </td> }

                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              }
              </Col>

              <Col lg={{ size: 4, order: 2 }} xs={{ size: 12, order: 1 }}><div className='pt-3'>
                  <div className='apple_font ac_re'><h3>Let's sort this out</h3></div><HRline />
                  <div> <StudentListSortSection onChangeHandle={this.onChangeHandle} /></div>
                </div>
                </Col>

            </Row>

          </div>

        </div>

      </div>

    )
  }
}
export default StudentList
