import React from 'react'

import NavbarMain from '../navbar/NavbarMain'
import Loader from '../components/Loader'
import SMPNavbar from './SMPNavbar'
import StudentDetails from './StudentDetails'

class StudentMPDetailView extends React.Component {
  constructor(props){
    super(props)
    this.state = {buffering: true}
  }

  handleDataCallbackName = (stuName) => {
    this.setState({
      studentName: stuName,
      buffering: false
    })
  }

  render () {
    const { slug } = this.props.match.params
    const {studentName} = this.state
    const custom = `Student details: ${studentName}`
    return (
      <div>
        <NavbarMain a_link='smp' />
        <div className='pt-3 px-5'>

          <div><SMPNavbar active='custom' custom={custom} disabled={true} /></div>
          {this.state.buffering 
         ?     <div><div className="lead headname_sd_local p-5">Student Detail:</div><div className="pr-5"><Loader align="center" big/> </div></div>

         :  ''}
          <div className='pt-5'>
            <StudentDetails
            slug = {slug}
            dataCallbackName = {this.handleDataCallbackName} />

          </div>

        </div>
      </div>
    )
  }
}
export default StudentMPDetailView
