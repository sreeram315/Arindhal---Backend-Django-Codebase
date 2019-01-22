import React from 'react'

import { Link } from 'react-router-dom'
import './css.css'
import NavbarMain from '../navbar/NavbarMain'
import SMPNavbar from './SMPNavbar'
import StudentList from './StudentList'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkAuthAction } from '../actions/CamperActions'

class StudentMPListView extends React.Component {
  render () {
    let { isAuthenticated } = this.props
    return (
      <div>
        <NavbarMain active='smp' />

        <div className='pt-3 px-5'>
          <SMPNavbar active='list' />
          {isAuthenticated === true
            ? <StudentList /> : ''
          }

          {isAuthenticated === false
            ? <div className='apple_font font_20 ac_re p-5'> Please login or <a href='/user/register/'>register</a> to add students and list them here.</div>
            : ''
          }

        </div>
      </div>
    )
  }
}

StudentMPListView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.camper.isAuthenticated
})

export default connect(mapStateToProps, { checkAuthAction })(StudentMPListView)
